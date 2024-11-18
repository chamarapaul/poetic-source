---
id: "kotlin-null-koan"
title: "The Koan of Optional Existence"
author: "Poetic Source"
date: "2024-11-04T17:27:13-05:00"
form: "koan"
language: "kotlin"
tags: 
  - null-safety
  - existence
  - reflection
preview: "A meditation on existence and nullability through Kotlin's type system"
notes:
  composition: "Uses Kotlin's null safety features to explore the nature of existence and absence."
  technical: "Demonstrates Kotlin's smart casting, null safety operators, and extension functions."
  philosophical: "Explores the paradox of existence and non-existence, using null as a metaphor for emptiness."
---
fun String?.contemplateExistence() = when {
    this == null -> "What exists in nothing?"
    isEmpty() -> "Is empty truly empty?"
    else -> "Form is not different from emptiness"
}

fun main() {
    val void: String? = null
    val emptiness = ""
    val form = "being"

    println(void.contemplateExistence())
    println(emptiness.contemplateExistence())
    println(form.contemplateExistence())
}