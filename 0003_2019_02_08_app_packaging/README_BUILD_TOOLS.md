# DISCLAIMER

These views are my (Alex) own, based on practical, applied experience over time.

# JAVA

## BUILD TOOLS BASIC HISTORY

1. [Apache Ant](https://ant.apache.org/)
   * Awesome tool for executing tasks
   * Pioneered glob file pattern matching techniques
   * Flexible (write your own build pipeline using a pre-defined library of helper tasks)
1. [Apache Maven](https://maven.apache.org/)
   * Awesome build tool
   * Pioneered "model based" project definition
   * Pioneered "convention based" project structure
1. [Gradle](https://gradle.org/)
   * Based on Groovy
   * Uses conventions by default
   * Flexible (write your own build pipeline)

## OPINIONS

### Apache Ant

* Pre-dated better tools like Maven
* Was the best tool of it's time
* You essentially scripted your own custom program to build your application
* No reason to use it anymore (at least, for building Java applications)

### Apache Maven

* The undisputed king of Java build tools
* Model based approach (`pom.xml` aka POM [Project Object Model]) is **THE** killer design that gives Maven longevity
* You can open *ANY* maven project ant run `mvn compile`, `mvn test` etc
* Extensive **STANDARD** project layout options: apps, libs, meta, multi-module, etc
* Comprehensive build lifecycle stages that work for practically any project
* Extensive plugin ecosystem for customization, edge case handling
   * Plugins simply join lifecycle phases, they **DO NOT** introduce arbitrary, human defined behavior changes to a project
* **FAST**
   * Supports parallelization of multi-module deeply nested project hierarchies by creating a DAG of modules and parallelizing wherever possible

### Gradle

* Wants to replace Maven
   * Primary argument was Maven config is too verbose (is that even valid? IDE support + code completion for XML make this moot IMHO.  I think authoring a Gradle file is much harder.)
* Based on Groovy
   * Dead language.  No one really cares anymore after Java 8 w/ lambda's.
   * Lost initial two corporate sponsorship for langauge development
   * Introduces no less then two variations for allowed syntax to define the same data structures
* Slow as molasses
   * Like really, really slow
   * So slow they had to invent an always-on background build daemon to take advantage of an already warmed up JVM
* Basically ant with **MORE** flexibility (this is BAD for a project build tool IMHO, Maven proves why)
   * Argument is if you use all defaults that the overall syntax is terser (technically true)
      * No one uses all defaults once you have a single dependency and more then 1 class
   * You end up with a complete mess of a custom program.  Every Gradle build is a special snowflake (unique)


# NODE

Node doesn't have all-in-one toos like Maven for dependency + build management.

The community split this in two:

1. Dependency Management
1. Build tools

## DEPENDENCY MANAGEMENT BASIC HISTORY

### PACKAGE.JSON

This is the ubiquitous file which describes, among other things:

* Project metadata
* Dependencies (runtime, development, peer)
* Scripts (arbitrary scripts you define)

### NPM

Initially the only package manager.

Used for years with **MAJOR** deficiencies in terms of repeatable builds.

People resorted to checking in `node_modules/` to source code to give them peace of mind about reliable, repeatable builds.

Now has `package-lock.json`, but, admittedly still doesn't really do it's job properly.

Unfortunately, still the most widely used.

### YARN

Created by Facebook because NPM was (and still is) garbage.

First to introduce **STABLE** dependency management for the Node ecosystem.  Proper version locking for dependencies.

This enables consistent behavior accross fresh installations (i.e. repeatable builds).


## BUILD TOOLS BASIC HISTORY

### Grunt

Analgous to Apache Ant.

You use a provided suite of helpers and community extensions to assemble your own program to build your program.

No structure

### Gulp

Tried to improve on Grunt by making everything stream/piplines.

One thing feeds into the next.

Simplified things quite a bit versus Gulp, added some sanity/consistency to the order in which things were done.

### Bundlers

Generically, bundlers started to appear.

These, among other things, basically:

* Generally, use a project model to define where your source is
* Knows about your dependencies
* Uses a model based approach to define how to transform your sources
* Uses a model based approach to define how to package your sources

Notice the trend here? (model based approach, package.json for deps, and bundler for build)

### Webpack

The king of bundlers.

We use it, for example, to:

1. Transpile TypeScript to JavaScript
1. Transform through Babel for
   1. Runtime platform targeting (browserlist) for ECMAScript compatability (uses most modern features of ECMAScript for your lowest-common-denominator target runtime)
   1. Polyfills (part of above)
   1. Minification
   1. Module loading system emulation (makes browsers work like node when resolving dependencies)
1. Analyze, compress, optimize assets (raster images, SVGs, fonts, etc)
1. Stylesheet processing (CSS, PostCSS, SASS, LESS, etc)
1. Package all your sources, dependencies, assets, styles together in the smallest most optimal way