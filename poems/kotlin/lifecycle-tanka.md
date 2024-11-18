---
id: "lifecycle-tanka"
title: "Lifecycle Tanka"
author: "Poetic Source"
date: "2024-11-12T09:00:00-05:00"
form: "tanka"
language: "kotlin"
tags:
  - lifecycle
  - memory
  - nature
preview: "A tanka exploring object lifecycles through natural metaphors"
notes:
  composition: "This tanka follows the traditional 5-7-5-7-7 syllable pattern while using Kotlin's scope functions to create a natural flow. Each phase of the object's lifecycle is matched with a natural metaphor."
  technical: "The poem uses Kotlin's scope functions (let, also, apply) to manage object lifecycle. The nullability system is employed symbolically, with the optional type representing impermanence. The use of scope functions creates a clean chain of operations while maintaining readability."
  philosophical: "The poem draws parallels between programming lifecycles and natural cycles. Just as leaves fall and return to the earth, objects are created and eventually collected. The temporary nature of variables mirrors the impermanence in nature, while the cyclical pattern of cleanup and reuse reflects ecological cycles."
---
data class Leaf(var green: Int)

fun autumn() = Leaf(100)
    .let { leaf ->    // dawn brings forth new life
        leaf.also {    // chlorophyll fades slowly now
            it.green -= 50   // autumn takes its toll
        }.apply { green = 0  // golden turns to brown at last
        }.also { null }      // returns to the earth's embrace 
    }