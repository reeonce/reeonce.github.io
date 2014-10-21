---
layout: post
category: Website
tags: canvas html5
---
<div id="main">
<h1>HTML <span class="color_h1">Canvas</span> Reference</h1>
<div class="chapter">
</div>
<hr>

<h2>Description</h2>
<p>The HTML5 &lt;canvas&gt; tag is used to draw graphics, on the fly, via scripting 
(usually JavaScript).</p>
<p>However, the &lt;canvas&gt; element has no drawing abilities of its own (it is only 
a container for graphics) - you must use a script to actually draw the graphics.</p>
<p>The getContext() method returns an object that provides methods and 
properties for drawing on the canvas.</p>
<p>This reference will cover the properties and methods of the getContext("2d") 
object, which can be used to draw text, lines, boxes, circles, and more - on the 
canvas.</p>
<hr>

<h2>Browser Support</h2>
<p>
<img src="http://www.w3schools.com/images/compatible_ie.gif" width="31" height="30" alt="Internet Explorer" title="Internet Explorer">
<img src="http://www.w3schools.com/images/compatible_firefox.gif" width="31" height="30" alt="Firefox" title="Firefox">
<img src="http://www.w3schools.com/images/compatible_opera.gif" width="28" height="30" alt="Opera" title="Opera">
<img src="http://www.w3schools.com/images/compatible_chrome.gif" width="31" height="30" alt="Google Chrome" title="Google Chrome">
<img src="http://www.w3schools.com/images/compatible_safari.gif" width="28" height="30" alt="Safari" title="Safari"></p>
<p>Internet Explorer 9, Firefox, Opera, Chrome, and Safari support &lt;canvas&gt; and 
its properties and methods.</p>
<p><b>Note:</b> Internet Explorer 8 and earlier versions, do not support the 
&lt;canvas&gt; element.</p>
<hr>

<h2>Colors, Styles, and Shadows</h2>
<table class="reference notranslate">
  <tbody><tr>
    <th style="width:25%">Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_fillstyle.asp">fillStyle</a></td>
    <td>Sets or returns the color, gradient, or pattern used to fill the drawing</td>
  </tr>
	<tr>
    <td><a href="http://www.w3schools.com/tags/canvas_strokestyle.asp">strokeStyle</a></td>
    <td>Sets or returns the color, gradient, or pattern used for strokes</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_shadowcolor.asp">shadowColor</a></td>
    <td>Sets or returns the color to use for shadows</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_shadowblur.asp">shadowBlur</a></td>
    <td>Sets or returns the blur level for shadows</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_shadowoffsetx.asp">shadowOffsetX</a></td>
    <td>Sets or returns the horizontal distance of the shadow from the shape</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_shadowoffsety.asp">shadowOffsetY</a></td>
    <td>Sets or returns the vertical distance of the shadow from the shape</td>
  </tr>
  </tbody></table>
<br>

<table class="reference notranslate">
  <tbody><tr>
    <th style="width:25%">Method</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_createlineargradient.asp">
	createLinearGradient()</a></td>
    <td>Creates a linear gradient (to use on canvas content)</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_createpattern.asp">createPattern()</a></td>
    <td>Repeats a specified element in the specified direction</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_createradialgradient.asp">createRadialGradient()</a></td>
    <td>Creates a radial/circular gradient (to use on canvas content)</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_addcolorstop.asp">addColorStop()</a></td>
    <td>Specifies the colors and stop positions in a gradient object</td>
  </tr>
	</tbody></table>

<h2>Line Styles</h2>
<table class="reference notranslate">
  <tbody><tr>
    <th style="width:25%">Property</th>
    <th>Description</th>
  </tr>
	<tr>
    <td><a href="http://www.w3schools.com/tags/canvas_linecap.asp">lineCap</a></td>
    <td>Sets or returns the style of the end caps for a line</td>
  </tr>
	<tr>
    <td><a href="http://www.w3schools.com/tags/canvas_linejoin.asp">lineJoin</a></td>
    <td>Sets or returns the type of corner created, when two lines meet</td>
  </tr>
	<tr>
    <td><a href="http://www.w3schools.com/tags/canvas_linewidth.asp">lineWidth</a></td>
    <td>Sets or returns the current line width</td>
  </tr>
	<tr>
    <td><a href="http://www.w3schools.com/tags/canvas_miterlimit.asp">miterLimit</a></td>
    <td>Sets or returns the maximum miter length</td>
  </tr>
  </tbody></table>
<h2>Rectangles</h2>
<table class="reference notranslate">
  <tbody><tr>
    <th style="width:25%">Method</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_rect.asp">rect()</a></td>
    <td>Creates a rectangle</td>
  </tr>
  <tr>
   <td><a href="http://www.w3schools.com/tags/canvas_fillrect.asp">fillRect()</a></td>
    <td>Draws a "filled" rectangle</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_strokerect.asp">strokeRect()</a></td>
    <td>Draws a rectangle (no fill)</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_clearrect.asp">clearRect()</a></td>
    <td>Clears the specified pixels within a given rectangle</td>
  </tr>
  </tbody></table>

<h2>Paths</h2>
<table class="reference notranslate">
  <tbody><tr>
    <th style="width:25%">Method</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_fill.asp">fill()</a></td>
    <td>Fills the current drawing (path)</td>
  </tr>
	<tr>
    <td><a href="http://www.w3schools.com/tags/canvas_stroke.asp">stroke()</a></td>
    <td>Actually draws the path you have defined</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_beginpath.asp">beginPath()</a></td>
    <td>Begins a path, or resets the current path</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_moveto.asp">moveTo()</a></td>
    <td>Moves the path to the specified point in the canvas, without creating a 
	line</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_closepath.asp">closePath()</a></td>
    <td>Creates a path from the current point back to the starting point</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_lineto.asp">lineTo()</a></td>
    <td>Adds a new point and creates a line from that point to the last 
	specified point in the canvas</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_clip.asp">clip()</a></td>
    <td>Clips a region of any shape and size from the original canvas</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_quadraticcurveto.asp">quadraticCurveTo()</a></td>
    <td>Creates a quadratic Bézier curve</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_beziercurveto.asp">bezierCurveTo()</a></td>
    <td>Creates a cubic Bézier curve</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_arc.asp">arc()</a></td>
    <td>Creates an arc/curve (used to create circles, or parts of circles)</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_arcto.asp">arcTo()</a></td>
    <td>Creates an arc/curve between two tangents</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_ispointinpath.asp">isPointInPath()</a></td>
    <td>Returns true if the specified point is in the current path, otherwise 
	false</td>
  </tr>
</tbody></table>

<h2>Transformations</h2>
<table class="reference notranslate">
  <tbody><tr>
    <th style="width:25%">Method</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_scale.asp">scale()</a></td>
    <td>Scales the current drawing bigger or smaller</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_rotate.asp">rotate()</a></td>
    <td>Rotates the current drawing</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_translate.asp">translate()</a></td>
    <td>Remaps the (0,0) position on the canvas</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_transform.asp">transform()</a></td>
    <td>Replaces the current transformation matrix for the drawing</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_settransform.asp">setTransform()</a></td>
    <td>Resets the current transform to the identity matrix. Then runs <a href="http://www.w3schools.com/tags/canvas_transform.asp">
	transform()</a></td>
  </tr>
  </tbody></table>

<h2>Text</h2>
<table class="reference notranslate">
  <tbody><tr>
    <th style="width:25%">Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_font.asp">font</a></td>
    <td>Sets or returns the current font properties for text content</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_textalign.asp">textAlign</a></td>
    <td>Sets or returns the current alignment for text content</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_textbaseline.asp">textBaseline</a></td>
    <td>Sets or returns the current text baseline used when drawing text</td>
  </tr>
</tbody></table>
<br>

<table class="reference notranslate">
   <tbody><tr>
    <th style="width:25%">Method</th>
    <th>Description</th>
</tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_filltext.asp">fillText()</a></td>
    <td>Draws "filled" text on the canvas</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_stroketext.asp">strokeText()</a></td>
    <td>Draws text on the canvas (no fill)</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_measuretext.asp">measureText()</a></td>
    <td>Returns an object that contains the width of the specified text</td>
  </tr>
</tbody></table>

<h2>Image Drawing</h2>
<table class="reference notranslate">
   <tbody><tr>
    <th style="width:25%">Method</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_drawimage.asp">drawImage()</a></td>
    <td>Draws an image, canvas, or video onto the canvas</td>
  </tr>
  </tbody></table>
  
<h2>Pixel Manipulation</h2>
<table class="reference notranslate">
  <tbody><tr>
    <th style="width:25%">Property</th>
    <th>Description</th>
  </tr>
    <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_imagedata_width.asp">width</a></td>
    <td>Returns the width of an ImageData object</td>
    </tr>
	<tr>
    <td><a href="http://www.w3schools.com/tags/canvas_imagedata_height.asp">height</a></td>
    <td>Returns the height of an ImageData object</td>
    </tr>
	<tr>
    <td><a href="http://www.w3schools.com/tags/canvas_imagedata_data.asp">data</a></td>
    <td>Returns an object that contains image data of a specified ImageData 
	object</td>
    </tr>
</tbody></table>
<br>

<table class="reference notranslate">
   <tbody><tr>
    <th style="width:25%">Method</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_createimagedata.asp">createImageData()</a></td>
    <td>Creates a new, blank ImageData object</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_getimagedata.asp">getImageData()</a></td>
    <td>Returns an ImageData object that copies the pixel data for the specified 
	rectangle on a canvas</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_putimagedata.asp">putImageData()</a></td>
    <td>Puts the image data (from a specified ImageData object) back onto the 
	canvas</td>
  </tr>
</tbody></table>
  
<h2>Compositing</h2>
<table class="reference notranslate">
  <tbody><tr>
    <th style="width:25%">Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_globalalpha.asp">globalAlpha</a></td>
    <td>Sets or returns the current alpha or transparency value of the drawing</td>
  </tr>
  <tr>
    <td><a href="http://www.w3schools.com/tags/canvas_globalcompositeoperation.asp">globalCompositeOperation</a></td>
    <td>Sets or returns how a new image are drawn onto an existing image</td>
  </tr>
</tbody></table>

<h2>Other</h2>
<table class="reference notranslate">
  <tbody><tr>
    <th style="width:25%">Method</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>save()</td>
    <td>Saves the state of the current context</td>
  </tr>
  <tr>
    <td>restore()</td>
    <td>Returns previously saved path state and attributes</td>
  </tr>
  <tr>
    <td>createEvent()</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>getContext()</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>toDataURL()</td>
    <td>&nbsp;</td>
  </tr>
</tbody></table>
<br>

<br>
<div class="chapter">
<div class="prev"><a class="chapter" href="http://www.w3schools.com/tags/ref_eventattributes.asp">« Previous</a></div>
<div class="next"><a class="chapter" href="http://www.w3schools.com/tags/ref_av_dom.asp">Next Reference »</a></div>
</div>
				<hr>
				<!-- SmallPS -->
				<div id="div-gpt-ad-1403595829794-4" style="width:728px;display:none;">
				<script type="text/javascript">
				googletag.cmd.push(function() { googletag.display('div-gpt-ad-1403595829794-4'); });
				</script><div id="google_ads_iframe_/16833175/SmallPS_0__container__" style="border: 0pt none;"><iframe id="google_ads_iframe_/16833175/SmallPS_0" name="google_ads_iframe_/16833175/SmallPS_0" width="723" height="170" scrolling="no" marginwidth="0" marginheight="0" frameborder="0" src="javascript:&quot;<html><body style='background:transparent'></body></html>&quot;" style="border: 0px; vertical-align: bottom;"></iframe></div>
				</div>
				<!-- LargePS -->
				<div id="div-gpt-ad-1403595829794-1" style="width: 728px;">
				<script type="text/javascript">
				googletag.cmd.push(function() { googletag.display('div-gpt-ad-1403595829794-1'); });
				</script><div id="google_ads_iframe_/16833175/LargePS_0__container__" style="border: 0pt none;"><iframe id="google_ads_iframe_/16833175/LargePS_0" name="google_ads_iframe_/16833175/LargePS_0" width="728" height="450" scrolling="no" marginwidth="0" marginheight="0" frameborder="0" src="javascript:&quot;<html><body style='background:transparent'></body></html>&quot;" style="border: 0px; vertical-align: bottom;"></iframe></div>
				</div>
				<!-- BottomMediumRectangle -->
				<div id="div-gpt-ad-1403595829794-0" style="width:300px;height:250px;margin-left:172px;">
				<script type="text/javascript">
				googletag.cmd.push(function() { googletag.display('div-gpt-ad-1403595829794-0'); });
				</script><div id="google_ads_iframe_/16833175/BottomMediumRectangle_0__container__" style="border: 0pt none;"><iframe id="google_ads_iframe_/16833175/BottomMediumRectangle_0" name="google_ads_iframe_/16833175/BottomMediumRectangle_0" width="300" height="250" scrolling="no" marginwidth="0" marginheight="0" frameborder="0" src="javascript:&quot;<html><body style='background:transparent'></body></html>&quot;" style="border: 0px; vertical-align: bottom;"></iframe></div>
				</div>
				<div id="err_form">
					<h2>Your suggestion:</h2>
					<p><label for="err_email">Your E-mail (optional):</label> <input type="email" id="err_email" name="err_email"></p>
					<p><label for="err_url">Page address:</label> <input type="text" disabled="disabled" id="err_url" name="err_url"></p>
					<p><label for="err_desc">Description:</label> <textarea name="err_desc" id="err_desc" cols="92" rows="20"></textarea></p>
					<p class="submit"><input type="button" value="Submit" onclick="sendErr()"></p>
					<div class="err_close" onclick="hideError()">Close [X]</div>
				</div>
				<div id="err_sent">
					<h2>Thank You For Helping Us!</h2>
					<p>Your message has been sent to W3Schools.</p>
					<div class="err_close" onclick="hideSent()">Close [X]</div>
				</div>
			</div>