# HackerRank Python

My solutions to the [HackerRank Python track](https://www.hackerrank.com/domains/python), grouped by topic, with
`unittest` tests in [`tests/`](tests) (one test module per topic).

| Topic                                           | Problems |
| ----------------------------------------------- | -------- |
| [Introduction](solutions/introduction)          | 8        |
| [Data Types](solutions/data_types)              | 7        |
| [Strings](solutions/strings)                    | 15       |
| [Sets](solutions/sets)                          | 14       |
| [Math](solutions/maths)                         | 8        |
| [Itertools](solutions/iterators)                | 8        |
| [Collections](solutions/collection_types)       | 9        |
| [Date and Time](solutions/date_time)            | 3        |
| [Errors and Exceptions](solutions/errors)       | 3        |
| [Classes](solutions/classes)                    | 3        |
| [Built-Ins](solutions/built_ins)                | 7        |
| [Python Functionals](solutions/functionals)     | 4        |
| [Regex and Parsing](solutions/regex)            | 18       |
| [XML](solutions/xml_parsing)                    | 3        |
| [Closures and Decorators](solutions/decorators) | 3        |
| [NumPy](solutions/numpy_arrays)                 | 16       |
| [Debugging](solutions/debugging)                | 3        |

## Run the tests

```bash
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
.venv/bin/python -m unittest discover -s tests -p "test_*.py"
```

## Certificate

[HackerRank · Python (Basic) skill certificate](Resources/Certificate.pdf)
