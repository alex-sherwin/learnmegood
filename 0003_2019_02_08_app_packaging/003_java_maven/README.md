# notes

We're using all default convention locations (as you should)

# compile
```bash
mvn clean compile
```

# test
```bash
mvn clean test
```

# package
```bash
mvn clean package
```

# run jar
```bash
java -cp "./target/helloworld-1.0.0-SNAPSHOT.jar:$HOME/.m2/repository/org/apache/commons/commons-lang3/3.7/commons-lang3-3.7.jar" com.acadia.HelloWorld

```