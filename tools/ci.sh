#!/usr/bin/env bash
# Build/test or format-check ONE course, run from that course's folder (Nx sets the cwd).
# The same logic as chavdar12/workflows ci.yml, scoped to a folder instead of a whole repo.
#   tools/ci.sh build  <java|node|python|dotnet|cpp|php>...
#   tools/ci.sh format <prettier|ruff|sqlfluff|google-java-format|csharpier|clang-format|php-cs-fixer>...
# Optional env (set per course in its project.json): SETUP, DOTNET_TEST_FILTER, PYTHON_RUN_SCRIPTS=true
set -uo pipefail
mode=$1; shift
TMP=${RUNNER_TEMP:-$(mktemp -d)}
group() { [ -n "${GITHUB_ACTIONS:-}" ] && echo "::group::$1" || echo "== $1"; }
endgroup() { [ -n "${GITHUB_ACTIONS:-}" ] && echo "::endgroup::" || true; }
fail() { echo "${GITHUB_ACTIONS:+::error::}$1 failed"; status=1; }
# top-most folders holding one of the given marker files (nested ones are built by their parent)
tops() { find . \( -name node_modules -o -name build -o -name .git -o -name .venv \) -prune -o \( "$@" \) -print \
  | xargs -n1 dirname | sort -u | awk '{ for (i in top) if (index($0 "/", top[i] "/") == 1) next; top[NR] = $0; print }'; }
status=0
# Python tools and test requirements go into a private venv: works on CI and on machines that block global pip
py() { [ -x "$TMP/venv/bin/python" ] || python3 -m venv "$TMP/venv"; "$TMP/venv/bin/python" "$@"; }
pytool() { [ -x "$TMP/venv/bin/$1" ] || py -m pip install -q "$1==$2"; "$TMP/venv/bin/$1" "${@:3}"; }

if [ -n "${SETUP:-}" ] && [ "$mode" = build ]; then RUNNER_TEMP=$TMP bash -ec "$SETUP" || exit 1; fi

for kind in "$@"; do case "$mode:$kind" in
build:java)
  for dir in $(tops -name settings.gradle -o -name settings.gradle.kts -o -name build.gradle -o -name build.gradle.kts -o -name pom.xml); do
    group "$dir"
    if [ -f "$dir/pom.xml" ]; then (cd "$dir" && mvn -B -q verify)
    elif [ -x "$dir/gradlew" ]; then (cd "$dir" && ./gradlew build)
    else (cd "$dir" && gradle build); fi || fail "$dir"
    endgroup
  done ;;
build:node)
  has() { node -e "process.exit(require('./package.json').scripts?.['$1'] ? 0 : 1)"; }
  for dir in $(tops -name package.json); do
    group "$dir"
    (
      set -e; cd "$dir"
      if [ -f package-lock.json ]; then npm ci --no-audit --no-fund; else npm install --no-audit --no-fund; fi
      find . -mindepth 2 -maxdepth 2 -name package.json -not -path "*/node_modules/*" -execdir npm install --no-audit --no-fund \;
      for s in lint typecheck check; do if has $s; then npm run $s; fi; done
      # Playwright end-to-end tests need their app running; skipped here as in the shared CI
      if has test && ! node -e "process.exit(/^\\s*(npx )?playwright/.test(require('./package.json').scripts.test) ? 0 : 1)"; then
        if node -e "process.exit(/\bng test\b/.test(require('./package.json').scripts.test) ? 0 : 1)"; then CI=true npm test -- --watch=false; else CI=true npm test; fi
      fi
      if has build; then npm run build; fi
    ) || fail "$dir"
    endgroup
  done ;;
build:python)
  py -m compileall -q . || fail "compileall"
  pytool ruff 0.17.2 check . --select E9,F63,F7,F82 || fail "ruff check"
  django=$(find . -name manage.py -not -path "*/.venv/*" | xargs -r -n1 dirname | sort -u)
  for dir in $django; do
    group "$dir"
    (cd "$dir" && python3 -m venv .venv && .venv/bin/pip install -q -r requirements.txt \
      && .venv/bin/python manage.py makemigrations --check --dry-run && .venv/bin/python manage.py test) || fail "$dir"
    endgroup
  done
  roots=$(find . \( -name .venv -o -name .git -o -name __pycache__ \) -prune -o -name "*test*.py" -print | while read -r f; do
    d=$(dirname "$f"); if [ -f "$d/__init__.py" ] && [ ! -f "$d/manage.py" ]; then d=$(dirname "$d"); fi; echo "$d"; done | sort -u)
  for d in $roots; do
    for dj in $django; do case "$d/" in "$dj"/*) continue 2;; esac; done
    group "$d"
    if [ -f "$d/requirements.txt" ]; then py -m pip install -q -r "$d/requirements.txt"; fi
    (cd "$d" && py -m unittest discover -p "*test*.py") || fail "$d"
    endgroup
  done
  if [ "${PYTHON_RUN_SCRIPTS:-}" = true ]; then
    for f in $(git ls-files '*.py'); do
      (cd "$(dirname "$f")" && py -c "import runpy, sys; sys.path.insert(0, '.'); runpy.run_path(sys.argv[1])" "$(basename "$f")" < /dev/null) || fail "$f"
    done
  fi ;;
build:dotnet)
  # every project in one throwaway solution, one folder each (lesson projects often share names)
  { echo '<Solution>'; git ls-files '*.csproj' | while read -r p; do
      echo "  <Folder Name=\"/$(dirname "$p")/\"><Project Path=\"$PWD/$p\" /></Folder>"; done; echo '</Solution>'; } > "$TMP/All.slnx"
  dotnet build "$TMP/All.slnx" -c Release && dotnet test "$TMP/All.slnx" -c Release --no-build ${DOTNET_TEST_FILTER:+--filter "$DOTNET_TEST_FILTER"} || fail "dotnet" ;;
build:cpp)
  for dir in $(tops -name CMakeLists.txt); do
    group "$dir"
    ASAN_OPTIONS=detect_leaks=0 cmake -S "$dir" -B "$TMP/build/$dir" -DCMAKE_BUILD_TYPE=Debug \
      -DCMAKE_CXX_FLAGS="-fsanitize=address,undefined -fno-sanitize-recover=undefined" \
      && cmake --build "$TMP/build/$dir" -j && ASAN_OPTIONS=detect_leaks=0 ctest --test-dir "$TMP/build/$dir" --output-on-failure -j || fail "$dir"
    endgroup
  done ;;
build:php)
  git ls-files -z '*.php' | xargs -0 -r -n1 php -l > /dev/null || fail "php -l"
  for t in $(git ls-files '*test_*.php' '*Test.php'); do
    group "$t"; (cd "$(dirname "$t")" && php "$(basename "$t")") || fail "$t"; endgroup
  done ;;
format:prettier) npx --yes prettier@3.9.10 --check . || fail prettier ;;
format:ruff) pytool ruff 0.17.2 format --check --diff . || fail ruff ;;
format:sqlfluff) pytool sqlfluff 4.5.0 lint --config .sqlfluff --rules layout,capitalisation --ignore parsing,lexing . || fail sqlfluff ;;
format:google-java-format)
  [ -f "$TMP/gjf.jar" ] || curl -sSL -o "$TMP/gjf.jar" https://github.com/google/google-java-format/releases/download/v2.0.0/google-java-format-2.0.0-all-deps.jar
  git ls-files -z '*.java' | xargs -0 -r java -jar "$TMP/gjf.jar" --aosp --skip-reflowing-long-strings --dry-run --set-exit-if-changed || fail google-java-format ;;
format:csharpier) dotnet tool restore && dotnet csharpier check . || fail csharpier ;;
format:clang-format) git ls-files -z '*.cpp' '*.h' '*.hpp' | xargs -0 -r clang-format --dry-run -Werror || fail clang-format ;;
format:php-cs-fixer)
  [ -f "$TMP/php-cs-fixer.phar" ] || curl -sSL -o "$TMP/php-cs-fixer.phar" https://github.com/PHP-CS-Fixer/PHP-CS-Fixer/releases/download/v3.95.27/php-cs-fixer.phar
  php "$TMP/php-cs-fixer.phar" check --diff || fail php-cs-fixer ;;
*) echo "unknown $mode kind: $kind" >&2; exit 2 ;;
esac; done
exit $status
