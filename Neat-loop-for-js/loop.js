const loop = (fun, fps) => {
  loop.unloop = () => {
    _private.ul = true;
  };

  const _private = {}
  const _loop = {}
  _loop.function = fun||loop.function;
  _loop.frameID = 0;
  _loop.maxfps = fps||loop.fps;
  _loop.mouse = {x:0,y:0};
  _loop.frame = 0;
  _loop.prev = 0;
  _loop.fps = undefined;

  _private.ul = false;
  _private.loop = (frametime => {
    if(_loop.prev < frametime) {
      _loop.frame++;
      _loop.function(_loop);
      _loop.prev = frametime + 1000 / _loop.maxfps;
      _loop.fps = 1000 / (_loop.prev - frametime);
    }
    if(!_private.ul) _loop.frameID = requestAnimationFrame(frametime => {
      _private.loop(frametime);
    });
  });

  _private.loop();
}
