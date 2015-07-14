---
layout: post
title: UIKit UI Catelog - Notes
category: ios
tags: [view, UIKit, iOS]
css: /css/uikit_ui_catelog.css
---

## Views

### <a class="catelog-item" name="UIActionSheet" href="#UIActionSheet">Action Sheets - UIActionSheet</a>

![](/assets/UIKIT_UI_CATELOG/uiactionsheet_intro_2x.png)

Action sheets display a set of buttons representing several alternative choices to complete a task initiated by the user.

you should include a Cancel button with action sheets displayed on iPhone and with those displayed on iPad over an open popover. Otherwise on iPad, action sheets are displayed within a popover, and the user can cancel the action sheet by tapping outside the popover, in which case you do not need to include a Cancel button.

```Objective-C
UIActionSheet *actionSheet = [[UIActionSheet alloc] initWithTitle:nil
                                                         delegate:self
                                                cancelButtonTitle:@"Cancel"
                                           destructiveButtonTitle:@"Delete Note"
                                                otherButtonTitles:nil];
```

On iPhone, because the action sheet slides up from the bottom of a view and covers the width of the screen, most apps use `showInView:`. On iPad, however, action sheets appear within a popover whose arrow points to the control the user tapped to invoke the choices presented by the action sheet. So, `showFromRect:inView:animated:` and `showFromBarButtonItem:animated:` are most useful on iPad.

To handle the choices presented by your action sheet, you must designate a delegate to handle the button’s action, and the delegate must conform to the UIActionSheetDelegate protocol.

You designate the delegate with the delegate parameter when you initialize the action sheet object. The delegate must implement the actionSheet:clickedButtonAtIndex: message to respond when the button is tapped.

```Objective-C
- (void)actionSheet:(UIActionSheet *)actionSheet
clickedButtonAtIndex:(NSInteger)buttonIndex
{
    NSLog(@"The %@ button was tapped.", [actionSheet
buttonTitleAtIndex:buttonIndex]);
}
```

The layout of action sheets is handled for you. You cannot create Auto Layout constraints between an action sheet and another user interface element.

<!-- more -->

### <a class="catelog-item" name="UIActivityIndicatorView" href="#UIActivityIndicatorView">Activity Indicators - UIActivityIndicatorView</a>

![](/assets/UIKIT_UI_CATELOG/uiactivityindicator_intro.png)

An activity indicator is a spinning wheel that indicates a task is in the midst of being processed. If an action takes a noticeable and indeterminate amount of time to process—such as a CPU-intensive task or connecting to a network—you should display an activity indicator to give assurance to the user that your app is not stalled or frozen.

To customize the appearance of all activity indicators in your app, use the appearance proxy (for example, `[UIActivityIndicatorView appearance]`).

*isAnimating* is unchecked by default; checking it causes the activity indicator to start animating. This is the equivalent of calling the *startAnimating* method. When you call the *startAnimating* and *stopAnimating* methods, the activity indicator automatically shows and hides onscreen. This way, you won’t have to worry about displaying a stationary activity indicator.

### <a class="catelog-item" name="UIAlertView" href="#UIAlertView">Alert Views - UIAlertView</a>

![](/assets/UIKIT_UI_CATELOG/uialertview_intro_2x.png)

Alert views display a concise and informative alert message to the user. *IOS Human Interface Guidelines* recommend that you limit alerts to two buttons, and consider using an action sheet instead if you need more.

An alert view floats over an existing view to interrupt its presentation, and it requires the user to dismiss it. If an alert view contains a custom button enabling the users to choose an alternative action, rather than simply dismissing the alert, that action is handled by the alert view’s delegate.

If your alert has a custom button, you must designate a delegate to handle the button’s action, and the delegate must conform to the UIAlertViewDelegate protocol. You designate the delegate with the delegate parameter when you initialize the alert view object. The delegate must implement the alertView:clickedButtonAtIndex: message to respond when the custom button is tapped; otherwise, your custom buttons do nothing.

In the delegate method alertView:clickedButtonAtIndex:, depending on which button the user tapped, you can retrieve the values of text fields in your alert view with the textFieldAtIndex: method.

The alert view is automatically dismissed after the alertView:clickedButtonAtIndex: delegate method is invoked. Optionally, you can implement the alertViewCancel: method to take the appropriate action when the system cancels your alert view. An alert view can be canceled at any time by the system—for example, when the user taps the Home button. If the delegate does not implement the alertViewCancel: method, the default behavior is to simulate the user clicking the cancel button and closing the view.


```Objective-C
UIAlertView *theAlert = [[UIAlertView alloc] initWithTitle:@"Title"
                                            message:@"This is the message."
										    delegate:self
											cancelButtonTitle:@"OK"
											otherButtonTitles:nil];
[theAlert show];
```

```Objective-C
- (void)alertView:(UIAlertView *)theAlert clickedButtonAtIndex:(NSInteger)buttonIndex {
	NSLog(@"The %@ button was tapped.", [theAlert buttonTitleAtIndex:buttonIndex]);
	if (theAlert.alertViewStyle == UIAlertViewStyleLoginAndPasswordInput) {
	    NSLog(@"The login field says %@, and the password is %@.",
		[theAlert textFieldAtIndex:0].text, [theAlert textFieldAtIndex:1].text);
	}
}
```

Optionally, an alert can contain one or two text fields, one of which can be a secure text-input field. You add text fields to an alert after it is created by setting its *alertViewStyle* property to one of the styles specified by the *UIAlertViewStyle* constants. The alert view styles can specify no text field (the default style), one plain text field, one secure text field (which displays a bullet character as each character is typed), or two text fields (one plain and one secure) to accommodate a login identifier and password.

The layout of alert views is handled for you. You cannot create Auto Layout constraints between an alert view and another user interface element.


### <a class="catelog-item" name="UICollectionView" href="#UICollectionView">Collection Views - UICollectionView</a>

![](/assets/UIKIT_UI_CATELOG/uicollectionview_intro.png)

A collection view displays an ordered collection of data items using standard or custom layouts. Similar to a table view, a collection view gets data from your custom data source objects and displays it using a combination of cell, layout, and supplementary views. A collection view can display items in a grid or in a custom layout that you design. Regardless of the layout style you choose, a collection view is best suited to display nonhierarchical, ordered data items.

Cells present the main content of your collection view. The job of a cell is to present the content for a single item from your data source object. Each cell must be an instance of the UICollectionViewCell class, which you may subclass as needed to present your content. Cell objects provide inherent support for managing their own selection and highlight state, although some custom code must be written to actually apply a highlight to a cell. A UICollectionViewCell object is a specific type of reusable view that you use for your main data items.

To manage the visual presentation of data, a collection view works with many related classes, such as UICollectionViewController, UICollectionViewDataSource, UICollectionViewDelegate, UICollectionReusableView, UICollectionViewCell, UICollectionViewLayout, and UICollectionViewLayoutAttributes.

Because a collection view works with these and other objects to determine the visual presentation of your data, configuring a collection view in Interface Builder means that you need to configure some objects separately.

* **Items**. The number of different types of data for which you define distinct cell objects. If your app works with only one type of data item—regardless of the total number of data items you display—set this value to 1.

* **Accessories**. The existence of a header or footer view for each section (this property isn’t available for custom layouts). Select Section Header or Section Footer as appropriate.


Whether the user is selecting or deselecting a cell, the cell’s selected state is always the last thing to change. Taps in a cell always result in changes to the cell’s highlighted state first. Only after the tap sequence ends and any highlights applied during that sequence are removed, does the selected state of the cell change. When designing your cells, you should make sure that the visual appearance of your highlights and selected state do not conflict in unintended ways.

When the user performs a long-tap gesture on a cell, the collection view attempts to display an Edit menu for that cell. The Edit menu can be used to cut, copy, and paste cells in the collection view.

To use a custom background for a collection view, you can specify a view that's positioned underneath all of the other content and sized automatically to fill the entire bounds of the collection view. You can set this value using the *backgroundView* property. Because this background view doesn’t scroll with the collection view’s content, it’s not an appropriate way to display a decorative background such as the appearance of wooden shelves.


### <a class="catelog-item" name="UIImageView" href="#UIImageView">Image Views - UIImageView</a>

An image view displays an image or an animated sequence of images.  Image views support the same file formats as the *UIImage* class — TIFF, JPEG, PNG, Windows bitmap (bmp), Windows icon (ico), Windows cursor (cur), and X Window System bitmap (xbm) formats.

*image*, *highlightedImage* properties for single image.

*animationImages*, *highlightedAnimationImages* properties for animated sequence of images.

**AllimagesassociatedwithaUIImageViewobjectshouldhavethesamescalevalue.Ifyour application uses images with different scales, they may render incorrectly.**


### <a class="catelog-item" name="UILabel" href="#UILabel">Labels - UILabel</a>

![](/assets/UIKIT_UI_CATELOG/uilabel_intro_2x.png)

set value *text* and *attributedText*

By default, a label is a single line. To create a multiline label, increase the value of the *numberOfLines*.

*adjustsFontSizeToFitWidth* vs *adjustsLetterSpacingToFitWidth*

The Baselines (baselineAdjustment) field determines how to adjust the position of text in cases when the text must be drawn using a different font size than the one originally specified.

Use the Line Breaks (lineBreakMode) field to specify the technique to use for wrapping and truncating the label’s text if it exceeds a single line. Note that if this property is set to a value that causes text to wrap to another line, do not set the adjustsFontSizeToFitWidth or adjustsLetterSpacingToFitWidth property to YES.

**Specifying conflicting text wrapping and font adjustment settings**. The lineBreakMode property describes how text should wrap or truncate within the label. If you set a value for this property that causes text to wrap to another line, do not set the adjustsFontSizeToFitWidth and adjustsLetterSpacingToFitWidth properties to YES, those fields are used to scale the font size to fit into the label without adding line breaks.


### <a class="catelog-item" name="UINavigationBar" href="#UINavigationBar">Navigation Bars - UINavigationBar</a>

![](/assets/UIKIT_UI_CATELOG/uinavbar_intro_2x.png)

Navigation bars allow you to present your app’s content in an organized and intuitive way. A navigation bar is displayed at the top of the screen, and contains buttons for navigating through a hierarchy of screens. A navigation bar generally has a back button, a title, and a right button. The most common way to use a navigation bar is with a navigation controller. You can also use a navigation bar as a standalone object in your app.

A UIBarButtonItem generally has a title and either a custom image or one of the system-supplied images listed in UIBarButtonSystemItem. It’s common to have a right bar button, but you can also use a left bar button in the place of a back button.

You are also responsible for managing the stack of *UINavigationItem* objects when you use a navigation bar as a standalone object. You push new navigation items onto the stack using the `pushNavigationItem:animated:` method and pop items off the stack using the `popNavigationItemAnimated:` method. In addition to pushing and popping items, you can also set the contents of the stack directly using either the `items` property or the `setItems:animated:` method. You might use these methods at launch time to restore your interface to its previous state or to push or pop more than one navigation item at a time.


### <a class="catelog-item" name="UIPickerView" href="#UIPickerView">Picker Views - UIPickerView</a>

![](/assets/UIKIT_UI_CATELOG/uipickerview_intro.png)

Picker views need a delegate to display data and appropriately handle user interaction. The delegate adopts the UIPickerViewDelegate protocol and provides the content for each component’s row, either as an attributed string, a plain string, or a view, and it typically responds to new selections or deselections. It also implements methods to return the drawing rectangle for rows in each component—these optional methods are only needed if the delegate returns a view as part of the picker’s content.

Additionally, picker views require a data source. The data source adopts the *UIPickerViewDataSource* protocol and implements the required methods to return the number of components (columns) and the number of rows in each component. Note that the actual contents of each row comes from the delegate, not the data source.

Picker views usually reside at the bottom of the screen in all device orientations. Select Bottom Space to Superview and set the relation equal to 0 for the date picker to pin to the bottom of the screen in all device orientations.


### <a class="catelog-item" name="UIProgressView" href="#UIProgressView">Progress Views - UIProgressView</a>

![](/assets/UIKIT_UI_CATELOG/uiprogressview_intro_2x.png)

To customize the appearance of all progress views in your app, use the appearance proxy (for example, [UIProgressView appearance]).


### <a class="catelog-item" name="UIScrollView" href="#UIScrollView">Scroll Views - UIScrollView</a>

A scroll view allows users to see content that is larger than the scroll view’s boundaries. When a scroll view first appears—or when users interact with it—vertical or horizontal scroll indicators flash briefly to show users that there is more content they can reveal. Other than the transient scroll indicators, a scroll view has no predefined appearance.

Scroll views need a delegate to handle scrolling, dragging, and zooming. By assigning a view controller as the scroll view’s delegate and implementing any or all of the UIScrollViewDelegate methods, you can define these behaviors.


### <a class="catelog-item" name="UISearchBar" href="#UISearchBar">Search Bars - UISearchBar</a>

![](/assets/UIKIT_UI_CATELOG/uisearchbar_intro_2x.png)

A search bar can also display a scope bar, which lets users limit the scope of a search.

Search bars need a delegate to handle user interaction. You implement the UISearchBarDelegate protocol on a delegate object to respond to user actions—for example, performing the search. Every search bar needs a delegate object that implements the UISearchBarDelegate protocol. The delegate is responsible for taking actions in response to user input such as editing the search text, starting or canceling a search, and tapping in the scope bar. At the very minimum, the delegate needs to perform a search after text is entered in the text field.


### <a class="catelog-item" name="UITabBar" href="#UITabBar">Tab Bars - UITabBar</a>

![](/assets/UIKIT_UI_CATELOG/uitabbar_intro_2x.png)

A tab bar provides easy access to different views in an app. Use a tab bar to organize information in your app by subtask. The most common way to use a tab bar is with a tab bar controller. You can also use a tab bar as a standalone object in your app.

The most common way to use a tab bar is in conjunction with a tab bar controller. A UITabBarController object manages the various tab views and view controllers, and the tab bar itself. If you use a tab bar controller, you should not use the UITabBar methods or properties to modify the tab bar. If you do, the system throws an exception.


### <a class="catelog-item" name="UITableView" href="#UITableView">Table Views - UITableView</a>

To display content, a table view must have a data source. The data source mediates between the app’s data model and the table view. A table view’s data source must conform to the *UITableViewDataSource* protocol.


### <a class="catelog-item" name="UITextView" href="#UITextView">Text Views - UITextView</a>

![](/assets/UIKIT_UI_CATELOG/uitextview_intro_2x.png)


### <a class="catelog-item" name="UIToolbar" href="#UIToolbar">Toolbars - UIToolbar</a>

![](/assets/UIKIT_UI_CATELOG/uitabbar_intro_2x.png)

A toolbar usually appears at the bottom of a screen, and displays one or more buttons called toolbar items. Generally, these buttons provide some sort of tool that is relevant to the screen’s current content. A toolbar is often used in conjunction with a navigation controller, which manages both the navigation bar and the toolbar.

After you create a toolbar, you need to add items to the bar. Each item is a UIBarButtonItem object, which you can add to the toolbar directly in Interface Builder or in code using the items property. If you want to animate changes to your toolbar items array, use the setItems:animated: method. You can specify the content of a particular bar button item by selecting its identifier. The identifier can either be custom or take on the value of well-know system buttons such as Edit or Done. For a list of system identifiers, see UIBarButtonSystemItem.

A common way to create and manage a toolbar is in conjunction with a navigation controller. The navigation controller displays the toolbar and populates it with items from the currently visible view controller. Using a navigation controller is ideal for an app design where you want to change the contents of the toolbar dynamically. However, you should not use a navigation controller if your app does not have or need a navigation bar.


### <a class="catelog-item" name="UIWebView" href="#UIWebView">Web Views - UIWebView</a>

To get your web view to display content, you simply create a UIWebView object, attach it to a window, and send it a request to load web content. Use the loadRequest: method to begin loading web content, the stopLoading method to stop loading, and the loading property to find out if a web view is in the process of loading.

## Controls

The **target-action mechanism** is a model for configuring a control to send an action message to a target object after a specific control event.

To create a relationship between the slider, the control event, the target, and the action, you can do one of two things:

1. Call the `addTarget:action:forControlEvents:` method within your target file:
```Objetive-C
[self.mySlider addTarget:self
                  action:@selector(myAction:)
        forControlEvents:UIControlEventValueChanged];
```

2. Use the Connections Inspector in Interface Builder to Control-drag the slider’s Value Changed event to the action method in the target file.


### <a class="catelog-item" name="UIButton" href="#UIButton">Buttons - UIButton</a>

![](/assets/UIKIT_UI_CATELOG/uibutton_intro.png)

Buttons let a user initiate behavior with a tap. You communicate a button’s function through a textual label or with an image.

In iOS 7, the rounded rect button type has been deprecated in favor of the system button, UIButtonTypeSystem. Button objects can be specified as one of five standard types—system, detail disclosure, info light, info dark, and add contact. The detail disclosure, info, and add contact button types are supplied with standard image graphics to indicate their purpose to the user. These images cannot be customized.


### <a class="catelog-item" name="UIDatePicker" href="#UIDatePicker">Date Pickers - UIDatePicker</a>

![](/assets/UIKIT_UI_CATELOG/uidatepicker_intro_2x.png)

A date picker is a control used for selecting a specific date, time, or both.

When a date picker is in the countdown mode, you can use the Timer (countDownDuration) field to specify the seconds from which the countdown timer should count down. This value is ignored if the date picker is not in UIDatePickerModeCountDownTimer mode. Note that even though the timer shows a countdown in seconds, a user can only specify minute intervals to count down from. A date picker object presents the countdown timer but does not implement it; the application must set up an NSTimer object and update the seconds as they’re counted down.

There are four mode settings: date and time, date only, time only, or countdown timer. The date and/or time modes allow users to select a specific point in time. The countdown timer allows users to specify a relative time period until an event occurs. You can specify one of these options using the Mode (datePickerMode) field in Attributes Inspector.


### <a class="catelog-item" name="UIPageControl" href="#UIPageControl">Page Controls - UIPageControl</a>

![](/assets/UIKIT_UI_CATELOG/uipagecontrol_intro_2x.png)

A page control displays a horizontal series of dots, each of which represents a page or screen in an app. Although a page control doesn’t manage the display of content pages, you can write code that lets users navigate between pages by tapping the control.

Typically, a page control is used with another view—such as a scroll view—that manages the pages and handles scrolling, panning, and zooming of the content. In this scenario, the scroll view usually uses paging mode to display the content, which is divided into separate views or into separate areas of one view.

Page controls need a delegate to handle user interaction. A page control doesn't automatically stay synchronized with the currently open page—or let users tap the control to transition between pages—unless you enable these actions in your app. To ensure that a page control's current-page dot corresponds to the page that is currently open in the scroll view, implement the UIScrollViewDelegate protocol in your view controller. Then, update the page control in the scrollViewDidScroll: delegate method and set the page control's currentPage property to the current page.


### <a class="catelog-item" name="UISegmentedControl" href="#UISegmentedControl">Segmented Controls - UISegmentedControl</a>

![](/assets/UIKIT_UI_CATELOG/uisegmentedcontrol_intro_2x.png)

Segmented controls do not need a delegate to function properly; their parent view controller can define their behavior without implementing any delegate protocols.


### <a class="catelog-item" name="UISlider" href="#UISlider">Sliders - UISlider</a>

![](/assets/UIKIT_UI_CATELOG/uislider_intro_2x.png)

Sliders enable users to interactively modify some adjustable value in an app, such as speaker volume or screen brightness.


### <a class="catelog-item" name="UIStepper" href="#UIStepper">Steppers - UIStepper</a>

![](/assets/UIKIT_UI_CATELOG/uistepper_intro_2x.png)

A stepper lets the user adjust a value by increasing and decreasing it in small steps. Steppers are used in situations where a user needs to adjust a value by a small amount.

You can specify when a stepper’s UIControlEventValueChanged events are sent by toggling the “Continuous” (continuous) checkbox in the Attributes Inspector. In continuous delivery, the stepper sends multiple Value Changed events while the user keeps pressing on the stepper. In noncontinuous delivery, the stepper sends one Value Changed event when the user releases the stepper. Continuous control event delivery is enabled by default.

A stepper defaults to autorepeat, which means that pressing and holding one of its buttons increments or decrements the stepper’s value repeatedly. The rate of change depends on how long the user continues pressing the control. The user can hold the stepper to quickly approach a desired value, and then increment or decrement to the desired value. Uncheck the “Autorepeat” (autorepeat) box if you want the stepper to be incremented or decremented one step at a time.


### <a class="catelog-item" name="UISwitch" href="#UISwitch">Switches - UISwitch</a>

![](/assets/UIKIT_UI_CATELOG/uiswitch_on_2x.png)


### <a class="catelog-item" name="UITextField" href="#UITextField">Text Fields - UITextField</a>

![](/assets/UIKIT_UI_CATELOG/uitextfield_intro_2x.png)

Text fields allows the user to input a single line of text into an app. You typically use text fields to gather small amounts of text from the user and perform some immediate action, such as a search operation, based on that text.

Text fields need a delegate to handle any custom behaviors, such as displaying additional overlay views when a user begins editing it. By assigning the parent view controller as the text field’s delegate and implementing any or all of the UITextFieldDelegate methods, you can implement such custom behaviors.


<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="/js/others/uikit_ui_category.js"></script>
