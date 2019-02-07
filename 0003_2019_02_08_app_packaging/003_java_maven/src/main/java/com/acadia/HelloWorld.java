package com.acadia;

import org.apache.commons.lang3.StringUtils;

public class HelloWorld {
  public static void main(String[] args) throws Exception {
    System.err.println("hello [" + StringUtils.trim(" world ") + "]");
  }
}

