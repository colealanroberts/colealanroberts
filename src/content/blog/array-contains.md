---
title: "What Array.contains(_:) Actually Checks"
description: "An unexpected result."
date: 2026-11-12
draft: false
---

Today, I wanted to check whether two types of content were present in an array.
For the sake of example, let's say we have a `Media` enum:

```swift
enum Media: Equatable {
    case text, audio, video
}
```

Given an array containing `.text` and `.audio`, I expected passing both values
to `contains(_:)` to return `true`:

```swift
let media: [Media] = [.text, .audio]
print(media.contains([.audio, .text])) // false
```

As you can probably guess from the fact that I'm writing about this, it didn't.

## What contains actually checks

There are two different questions hiding behind that method name.
Passing a single element asks whether that value exists in the array:

```swift
print(media.contains(.audio)) // true
```

Passing a collection uses a different [overload of `contains(_:)`](https://developer.apple.com/documentation/swift/collection/contains(_:)).
It searches for that collection's elements **together, in the same order**.
Both order and adjacency matter:

```swift
print(media.contains([.text, .audio])) // true
print(media.contains([.audio, .text])) // false

let separated: [Media] = [.text, .video, .audio]
print(separated.contains([.text, .audio])) // false
```

In `media`, `.text` comes immediately before `.audio`, so searching for
`[.text, .audio]` succeeds. Searching for `[.audio, .text]` fails because those
values appear in the opposite order in the array. In `separated`, the order
matches, but the search still fails because `.video` divides the two values.

This makes more sense when you think of a substring search:

```swift
print("hello".contains("ell")) // true
print("hello".contains("le"))  // false
```

The collection overload was introduced in Swift 5.7 as part of
[SE-0357](https://github.com/swiftlang/swift-evolution/blob/main/proposals/0357-regex-string-processing-algorithms.md),
which added string-processing operations and their generic collection equivalents.
It's useful for finding a contiguous sequence; I was looking for membership.

## Checking for both values

For my original question, [`allSatisfy(_:)`](https://developer.apple.com/documentation/swift/sequence/allsatisfy(_:))
expresses the intent directly:

```swift
let required: [Media] = [.audio, .text]
let containsBoth = required.allSatisfy { media.contains($0) }

print(containsBoth) // true
```

For each required value, check whether the array contains it. The values can
appear anywhere, in either order.

This checks membership, not how many times a value appears. If `required` contains
`.audio` twice, one `.audio` in `media` still satisfies the membership check.

For a couple of values, I'd use `allSatisfy`. It says exactly what I meant to
ask: are all of these values present?
