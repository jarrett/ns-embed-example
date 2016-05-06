QuestionApp = {
  initialize: function() {
    QuestionApp.initColorButtons();
    QuestionApp.initMinMaxButtons();
    QuestionApp.initOutput();
  },
  
  // The <button data-color="..."> tags.
  initColorButtons: function() {
    $('.btn-change-color').click(function() {
      ContextApp.circle.attr(
        'fill',
        $(this).attr('data-color')
      );
    });
  },
  
  // The <button class="btn-min/btn-max"> tags.
  initMinMaxButtons: function() {
    $('.btn-min').click(function() {
      ContextApp.setRadius(ContextApp.minRadius());
    });
    
    $('.btn-max').click(function() {
      ContextApp.setRadius(ContextApp.maxRadius());
    });
  },
  
  // The <output> tag.
  initOutput: function() {
    QuestionApp.radiusOutput = $('#question-radius-output');
    
    // Whenever the radius in the context changes, update the question's <output> tag.
    ContextApp.on('changeRadius', QuestionApp.updateOutput);
    
    // The event ContextApp/changeRadius may fire before QuestionApp.initialize. Thus,
    // we can't count on that event to trigger the handler registered above and set the
    // initial text of the question's <output> tag. We must set it here instead.
    QuestionApp.updateOutput(ContextApp.radius());
  },
  
  updateOutput: function(radius) {
    QuestionApp.radiusOutput.html(
      radius.toFixed(1)
    );
  }
}

ContextApp.on('initialize', QuestionApp.initialize);