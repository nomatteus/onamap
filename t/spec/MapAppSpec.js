describe("MapApp", function(){
  describe("config", function() {
    it("options are set to defaults if no options passed in", function() {
      expect((new MapApp({}))._opts())
        .toEqual({ map_canvas_id : 'map_canvas', sv_canvas_id : 'sv_canvas' });
    });
    it("option defaults are overwritten by opts passed in", function(){
      expect((new MapApp({ map_canvas_id : 'map_canvas_custom', sv_canvas_id : 'sv_canvas_custom' }))._opts())
        .toEqual({ map_canvas_id : 'map_canvas_custom', sv_canvas_id : 'sv_canvas_custom' });
    });
  });
});
