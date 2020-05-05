# Neat loop for JavaScript

A very basic loop function that uses requestAnimationFrame.

Initialize the loop by calling `loop(function, target fps)`.
The loop can be stopped by calling `loop.unloop()` and started again (if initialized) by calling `loop()` - with no parameters.

The function gets parsed the loop functions private variables an can achieve the fps of the loop and frame count.
