# notes

* added `maven-assembly-plugin` to `pom.xml`
  * configured `com.acadia.HelloWorld` as the `Main-Class` for the jar `MANIFEST.MF`

# assembly
```bash
mvn clean package assembly:single
```

# run runnable jar
```bash
java -jar target/helloworld-1.0.0-SNAPSHOT-jar-with-dependencies.jar one two three
```

# build a docker container
```bash
docker build -t java-hello-world .
```

# run the docker container
```bash
docker run -it --rm java-hello-world four five six
```