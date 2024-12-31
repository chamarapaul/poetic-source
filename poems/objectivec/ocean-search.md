---
id: "ocean-search"
title: "Ocean Search"
author: "Poetic Source"
date: "2024-12-29T01:02:17-05:00"
form: "tanka"
language: "objectivec"
tags:
  - recursion
  - memory
  - ocean
  - binary-search
  - tides
preview: "A binary search through ocean depths becomes a meditation on memory and searching, where each comparison draws us deeper into the waters of recollection"
notes:
  composition: |
    The poem follows the traditional 5-7-5-7-7 syllable pattern of tanka, with each line serving both as valid Objective-C code and poetic imagery. The ocean metaphor connects the technical concept of binary search with the emotional journey of seeking memories in deepening waters. Method names like `searchWaters` and `searchDeeper` extend the oceanic theme. The `Fish` represent precious memories to be caught from the depths, echoing David Lynch's quote: 
    
    "If you want to catch little fish, you can stay in the shallow water. But if you want to catch the big fish, you've got to go deeper. Down deep, the fish are more powerful and more pure. They're huge and abstract. And they're very beautiful."
    
    The `Depths` are the search space we navigate, the vast ocean of memory.
  technical: "A complete binary search implementation that uses ocean depths as array indices. The method checks the middle point, then recursively searches either shallower or deeper waters based on the comparison. The base case returns when the target depth is found or the bounds cross."
  philosophical: "The poem explores how searching through memory parallels the way algorithms search through data - both processes involve diving deeper, setting bounds, and recursive exploration. The transformation of binary search into an ocean metaphor, inspired by a quote from David Lynch, suggests that even our most logical structures mirror natural and emotional patterns. Memories, like fish, often lurk in the depths, powerful and elusive. The deeper we search, the more profound the truths we may surface."
---
@interface OceanSearch : NSObject
@property Depths *depths;
@property Fish *fish;
- (NSInteger)searchWaters:(NSUInteger)low high:(NSUInteger)high;
- (NSInteger)searchDeeper:(NSUInteger)mid than:(NSUInteger)high;
@end

@implementation OceanSearch

- (NSInteger)searchWaters:(NSUInteger)low high:(NSUInteger)high {
    NSInteger mid = [depths depthBetween:low and:high];  // dawn breaks on still seas
    if (low > high) return NSNotFound;          // through deep waters time flows past
    if ([fish swimsAtDepth:mid])                // memories appear
        return mid;                             // in these depths I find your trace
    return [self searchDeeper:mid than:high];   // seeking in the endless deep
}

- (NSInteger)searchDeeper:(NSUInteger)mid than:(NSUInteger)high {
    return [fish compareToDepth:mid] > 0
        ? [self searchWaters:mid+1 high:high]
        : [self searchWaters:low high:mid-1];
}
@end