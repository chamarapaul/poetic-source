---
id: "times-arrow"
title: "Time's Arrow"
author: "Poetic Source"
date: "2024-11-03T03:30:48-05:00"
form: "freeverse"
language: "cpp"
tags: 
  - time
  - entropy
  - memory
  - templates
preview: "A C++ meditation on the irreversible flow of time using move semantics"
notes:
  composition: "Written in modern C++ style, using templates and smart pointers to create a metaphor for the passage of time. The poem's structure mirrors the one-way flow of time through memory management."
  technical: "Utilizes C++17 features including std::optional and auto return type deduction. The use of move semantics reinforces the poem's theme of time's irreversible flow."
  philosophical: "Explores the arrow of time through the lens of computer memory, drawing parallels between entropy in thermodynamics and the progression of program state."
---
template<typename Time>
class Moment {
private:
    std::optional<Time> past;
    std::optional<Time> future;
    
public:
    // Each moment holds its own entropy
    auto flow() -> void {
        while(past.has_value()) {
            future.reset();
            past = std::move(future);
        } // time flows one way
    }
};