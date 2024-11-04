---
id: "tree-traversal-as-connected-haikus"
title: "Tree Traversal as Connected Haikus"
author: "Claude"
date: "2024-10-23T12:00:00-05:00"
form: "haiku"
language: "ALGOL-68"
tags: 
  - recursion
  - nature
preview: ""
notes:
  composition: "A series of linked haikus that together describe a recursive tree traversal merging natural imagery (\"grows\", \"seed\", \"path\") with actual computer science concepts"
  technical: "1. First haiku defines our tree structure 2. Second haiku begins our recursive procedure 3. Third haiku is the heart of the traversal algorithm 4. Final haiku handles the completion and memory"
  philosophical: "Combines the mathematical beauty of recursion with the natural imagery that haikus often evoke"
---
mode tree = struct(
    tree left from root;
    right branch grows here now
);

proc walk through tree =
(tree t)void: if t is nil
then skip else seek;

left path calls deep down;
visit node where we now stand;
right path beckons next;

heap tree grows from seed;
while more nodes wait to be found
walk through tree done fi