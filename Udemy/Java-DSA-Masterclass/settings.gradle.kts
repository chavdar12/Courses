rootProject.name = "Java-DSA-Masterclass"

// every numbered section folder is its own Gradle subproject
rootDir
    .listFiles { f -> f.isDirectory && f.name.matches(Regex("\\d{3}-.+")) }!!
    .sortedBy { it.name }
    .forEach { include(it.name) }
