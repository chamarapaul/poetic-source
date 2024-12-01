---
id: "threads-in-spring"
title: "Threads in Spring"
author: "Poetic Source" 
date: "2024-12-01T03:08:18-05:00"
form: "haiku"
language: "go"
tags:
  - parallel-processing
  - concurrency
  - nature
  - synchronization
  - harmony
preview: "Concurrent thoughts bloom like spring flowers in this Go code poem, exploring the beauty of parallel processing through nature-inspired haiku."
notes:
  composition: "The code poem maintains a cohesive narrative through haiku-structured comments, with each stanza focusing on a single theme. The technical implementation in Go and the poetic expression work together to explore the beauty of concurrent computation."
  technical: |
    The code uses Go's concurrency primitives to implement parallel processing:
      • Two goroutines, `taskOne` and `taskTwo`, represent concurrent tasks
      • `sync.WaitGroup` ensures the main goroutine waits for all tasks to complete
      • Channels facilitate communication between goroutines 
      • An anonymous goroutine waits for tasks to finish and closes the channel
  philosophical: "The poem draws parallels between concurrent computation and the natural world. Concurrent thoughts blooming like flowers in a spring code garden suggest the beauty and growth inherent in parallel processing. The merging of insights when threads join together evokes the idea of wisdom blossoming forth from the harmonious synthesis of independent explorations. The poem invites us to see the elegance and interconnectedness of concurrent systems, mirroring the patterns and rhythms of nature."
---
package main

import (
    "fmt"
    "sync"
)

func taskOne(wg *sync.WaitGroup, ch chan<- string) {
    defer wg.Done()
    // Seeking wisdom high 
    // Threads climb misty peaks, and find
    // Insights crisp and clear
    ch <- "Found wisdom on high"
}

func taskTwo(wg *sync.WaitGroup, ch chan<- string) {
    defer wg.Done()
    // Deep in earth's dark loam
    // Thread roots trace ancient secrets
    // Nature's hidden code
    ch <- "Found truth in the depths"
}

func main() {
    var wg sync.WaitGroup
    ch := make(chan string)

    // In spring's code garden
    // Concurrent thoughts bloom and grow
    // Like vibrant flowers  
    wg.Add(2)
    go taskOne(&wg, ch)
    go taskTwo(&wg, ch)

    // Insights found alone  
    // Merge as threads join together
    // Wisdom blossoms forth
    go func() {
        wg.Wait()
        close(ch)
    }()

    for msg := range ch {
        fmt.Println(msg)
    }
}