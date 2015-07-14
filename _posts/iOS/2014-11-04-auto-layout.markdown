---
layout: post
title: "Auto Layout"
category: ios
tags: ["auto layout", view, "constraint"]
---

#### 介绍

Auto Layout is a system that lets you lay out your app’s user interface by creating a mathematical description of the relationships between the elements. You define these relationships in terms of constraints either on individual elements, or between sets of elements. Using Auto Layout, you can create a dynamic and versatile interface that responds appropriately to changes in screen size, device orientation, and localization.

The fundamental building block in Auto Layout is the constraint. Constraints express rules for the layout of elements in your interface; for example, you can create a constraint that specifies an element’s width, or its horizontal distance from another element. You add and remove constraints, or change the properties of constraints, to affect the layout of your interface.
When calculating the runtime positions of elements in a user interface, the Auto Layout system considers all constraints at the same time, and sets positions in such a way that best satisfies all of the constraints.

If you have an existing constraint, setting another constraint of the same type does not override the previous one. For example, setting a second width constraint for a view does not remove or alter the first width constraint—you need to remove the first constraint manually.

You set the hugging and compression priorities for a UIView instance using setContentHuggingPriority:forAxis: and setContentCompressionResistancePriority:forAxis: (for NSView, you use setContentHuggingPriority:forOrientation: and setContentCompressionResistancePriority:forAxis:). By default, all UIKit- and AppKit-supplied views have a value of either NSLayoutPriorityDefaultHigh or NSLayoutPriorityDefaultLow.

#### Working with Constraints in Interface Builder

* Adding Constraints with Control-Drag
* Adding Constraints with Align and Pin Menus

	**Align**. Create alignment constraints, such as centering a view in its container, or aligning the left edges of two views.

	**Pin**. Create spacing constraints, such as defining the height of a view, or specifying its horizontal distance from another view.

	**Resizing**. Specify how resizing affects constraints .

* Adding Missing or Suggested Constraints

	**Issues**. Resolve layout issues by adding or resetting constraints based on suggestions.

* Editing Constraints

	You can change the constant, relation, and priority of a constraint. You can edit these properties either by double-clicking the constraint on the canvas and editing the value, or by selecting the constraint and using the Attributes inspector. You cannot, however, change the type of a constraint (for example, you can’t change a width constraint into a height constraint).

* Deleting Constraints
	Delete any constraint at any time by selecting it on the canvas or in the outline view and pressing the Delete key.

<!-- more -->

#### Working with Auto Layout Programmatically

You represent constraints using instances of NSLayoutConstraint. To create constraints, you typically use `constraintsWithVisualFormat:options:metrics:views:`.

```objective-c
NSDictionary *viewsDictionary =
                NSDictionaryOfVariableBindings(self.button1, self.button2);
NSArray *constraints =
        [NSLayoutConstraint constraintsWithVisualFormat:@"[button1]-[button2]"
                            options:0 metrics:nil views:viewsDictionary];
```

Although most of the constraints that are useful in real user interfaces can be expressed using the language, some cannot. One useful constraint that cannot be expressed is a fixed aspect ratio, you can use `constraintWithItem:attribute:relatedBy:toItem:attribute:multiplier:constant:`.

```objective-c
[NSLayoutConstraint constraintWithItem:self.button1
					attribute:NSLayoutAttributeWidth
					relatedBy:NSLayoutRelationEqual
					toItem:self.button1
					attribute:NSLayoutAttributeHeight
					multiplier:2.0
					constant:0.0];
```

NSView provides a method—addConstraint:—to add a constraint, and methods to remove or inspect existing constraints—removeConstraint: and constraints—as well as other related methods. NSView also provides a method, fittingSize, which is similar to the sizeToFit method of NSControl but for arbitrary views rather than for controls.
The fittingSize method returns the ideal size for the view considering only those constraints installed on the receiver’s subtree together with a preference for the view to be as small as possible . The fitting size is not the “best” size for a view in a general sense—in the constraint-based system, a view’s “best” size (if you consider everything) is by definition its current size.

#### To debug a problem with Auto Layout

1. Identify the view with an incorrect frame.
It may be obvious which view has the problem; if it is not, you may find it helpful to use the NSView
method _subtreeDescription to create a textual description of the view hierarchy.
2. If possible, reproduce the issue while running under the Auto Layout template in Instruments.
3. Find the bad constraint or constraints.
To get the constraints affecting a particular view, use constraintsAffectingLayoutForOrientation: in OS X or constraintsAffectingLayoutForAxis: in iOS.
You can then inspect the constraints in the debugger, which prints constraints using the visual format notation described in Visual Format Language (page 41). If your views have identifiers, they are printed out in the description, like this:
otherwise the output looks like this:
4. If it’s not obvious which constraint is wrong at this point, visualize the constraints on screen by passing the constraints to the window using visualizeConstraints:.
When you click a constraint, it is printed in the console. In this way you can you can determine which is which, and typically identify which is incorrect.
2013-09-18 | Copyright © 2013 Apple Inc. All Rights Reserved. 21
Important: The _subtreeDescription method is not public API; it is, however, permissible to use for debugging purposes.
&lt;NSLayoutConstraint: 0x400bef8e0
H:[refreshSegmentedControl]-(8)-[selectViewSegmentedControl] (Names:
refreshSegmentedControl:0x40048a600,
selectViewSegmentedControl:0x400487cc0 ) >
&lt;NSLayoutConstraint: 0x400cbf1c0 H:[NSSegmentedControl:0x40048a600]-(8)-[NSSegmentedControl:0x400487cc0]>
￼
Resolving Auto Layout Issues
Auto Layout Degrades Gracefully with Unsatisfiable Constraints
At this point you may be informed that the layout is ambiguous.
5. Find the code that’s wrong.
Sometimes, once you have identified the incorrect constraint, you will know what to do to fix it.
If this is not the case, then use Instruments to search for the pointer of the constraint (or some of its description). This will show you interesting events in that constraint’s lifecycle—its creation, modification, installation into windows, and so on. For each of these you can see the backtrace where it happened. Find the stage at which things went awry, and look at the backtrace. This is the code with the problem.


#### To lock a view inside a scroll view
1. Create a container view to hold the scroll view.
2. Create the scroll view and place it in the container view with all edges equal to zero points.
3. Create and place a subview inside of the scroll view.
4. Create constraints from the subview to the container view.

#### To space views proportionally
1. Create the visible views.
2. Create the spacer views equal to the number of visible views plus one.
3. Alternate placing your views, starting with a spacer view.
To space two visible views, place all of the views in the following pattern, starting from the left side of the screen and moving right:
spacer1 | view1 | spacer2 | view2 | spacer3.
4. Constrain the spacer views so that their lengths are equal to each other.
Note: Theheightofthespacerviewscanbeanyvalue,including0.However,youmustcreate constraints for the height of the views—don’t leave the height ambiguous.
5. Create a leading constraint from the first spacer view to the container view.
6. Create a trailing constraint from the last spacer view to the container view.
7. Create constraints between the spacer views and the visible views.

#### Implementing a Custom View to Work with Auto Layout

Auto Layout reduces the burden on controller classes by making views more self-organizing. If you implement a custom view class, you must provide enough information so that the Auto Layout system can make the correct calculations and satisfy the constraints. In particular, you should determine whether the view has an intrinsic size, and if so, implement intrinsicContentSize to return a suitable value.

Views Must Notify Auto Layout If Their Intrinsic Size Changes
If any property of your view changes, and that change affects the intrinsic content size, your view must call invalidateIntrinsicContentSize so that the layout system notices the change and can recalculate the layout. For example, a text field calls invalidateIntrinsicContentSize if the string value changes.

#### Visual Format Language

The following are examples of constraints you can specify using the visual format. Note how the text visually matches the image.

Standard Space

    [button]-[textField]

Width Constraint

    [button(>=50)]

Connection to Superview

    |-50-[purpleBox]-50-|

Vertical Layout

    V:[topField]-10-[bottomField]

Flush Views

    [maroonView][blueView]

Priority

    [button(100@20)]

Equal Widths

    [button1(==button2)]

Multiple Predicates

    [flexibleButton(>=70,<=100)]

A Complete Line of Layout

    |-[find]-[findNext]-[findField(>=20)]-|

##### Visual Format String Grammar

Symbol | Replacement rule
-------| ------------
&lt;visualFormatString> | (&lt;orientation>:)? (&lt;superview>&lt;connection>)? &lt;view>(&lt;connection>&lt;view>)* (&lt;connection>&lt;superview>)?
&lt;orientation> | H&#x7c;V
&lt;superview> | &#x7c;
&lt;view> | [&lt;viewName>(&lt;predicateListWithParens>)?]
&lt;connection> | e&#x7c;-&lt;predicateList>-&#x7c;-
&lt;predicateList> | &lt;simplePredicate>|&lt;predicateListWithParens>
&lt;simplePredicate> | &lt;metricName>&#x7c;&lt;positiveNumber>
&lt;predicateListWithParens> | (&lt;predicate>(,&lt;predicate>)*)
&lt;predicate> | (&lt;relation>)?(&lt;objectOfPredicate>)(@&lt;priority>)?
&lt;relation> | ==&#x7c;&lt;=&#x7c;>=
&lt;objectOfPredicate> | &lt;constant>&#x7c;&lt;viewName>
&lt;priority> | &lt;metricName>&#x7c;&lt;number>
&lt;constant> | &lt;metricName>&#x7c;&lt;number>
&lt;viewName> | Parsed as a C identifier. This must be a key mapping to an instance of NSView in the passed views dictionary.
&lt;metricName> | Parsed as a C identifier. This must be a key mapping to an instance of NSNumber in the passed metrics dictionary.
&lt;number> | As parsed by strtod_l, with the C locale.

#### 参考

[Auto Layout Guide]()
