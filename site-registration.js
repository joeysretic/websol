(function(){
  'use strict';
  var form=document.getElementById('registration-form');
  if(!form)return;
  var status=document.getElementById('form-status');
  var panels=[].slice.call(form.querySelectorAll('[data-show-when]'));

  function controlsFor(name){
    return [].slice.call(form.querySelectorAll('[name="'+name+'"]'));
  }
  function selectedValues(name){
    return controlsFor(name).filter(function(control){return control.checked;}).map(function(control){return control.value;});
  }
  function currentValues(name){
    var controls=controlsFor(name);
    if(!controls.length)return [];
    if(controls[0].type==='radio'||controls[0].type==='checkbox')return selectedValues(name);
    return [controls[0].value];
  }
  function matches(rule){
    return rule.split('&').every(function(condition){
      var parts=condition.split('=');
      return parts.length===2&&currentValues(parts[0]).indexOf(parts[1])!==-1;
    });
  }
  function setPanelControls(panel,enabled){
    [].slice.call(panel.querySelectorAll('input,select,textarea')).forEach(function(control){
      if(enabled){
        control.disabled=false;
        if(control.dataset.registrationRequired==='true'){
          control.required=true;
          delete control.dataset.registrationRequired;
        }
      }else{
        if(control.required){control.dataset.registrationRequired='true';control.required=false;}
        control.disabled=true;
      }
    });
  }
  function syncPanels(){
    panels.forEach(function(panel){
      var visible=matches(panel.getAttribute('data-show-when'));
      panel.classList.toggle('is-visible',visible);
      panel.hidden=!visible;
      setPanelControls(panel,visible);
    });
    validateMinimums();
  }
  function validateMinimums(){
    [].slice.call(form.querySelectorAll('[data-min-checks]')).forEach(function(group){
      var minimum=parseInt(group.getAttribute('data-min-checks'),10)||0;
      var checked=group.querySelectorAll('input[type="checkbox"]:checked').length;
      var first=group.querySelector('input[type="checkbox"]');
      if(first)first.setCustomValidity(checked<minimum?'Please select at least '+minimum+' options.':'');
    });
  }
  form.addEventListener('change',syncPanels);
  form.addEventListener('input',validateMinimums);
  syncPanels();

  [].slice.call(form.querySelectorAll('[data-add-child]')).forEach(function(button){
    button.addEventListener('click',function(){
      var next=form.querySelector('.child-card.optional:not(.is-visible)');
      if(!next){button.hidden=true;return;}
      next.classList.add('is-visible');
      next.querySelectorAll('input,select,textarea').forEach(function(control){control.disabled=false;});
      if(!form.querySelector('.child-card.optional:not(.is-visible)'))button.hidden=true;
    });
  });

  function labelFor(name){
    var control=form.querySelector('[name="'+name+'"]');
    if(!control)return name.replace(/[-_]/g,' ');
    var label=control.closest('.field');
    if(label){var text=label.querySelector('label,.field-label');if(text)return text.textContent.replace('*','').trim();}
    return name.replace(/[-_]/g,' ');
  }
  function valueText(control){
    if(control.type==='checkbox'||control.type==='radio')return control.checked?control.value:'';
    return control.value;
  }
  function buildBody(){
    var lines=['Little Wonders registration enquiry',''];
    var lastSection='';
    [].slice.call(form.querySelectorAll('input,select,textarea')).forEach(function(control){
      if(control.disabled||!valueText(control)||control.type==='submit'||control.type==='button'||control.type==='reset'||control.type==='hidden'||control.type==='file')return;
      var section=control.closest('[data-section]');
      var sectionName=section?section.getAttribute('data-section'):'';
      if(sectionName&&sectionName!==lastSection){lines.push('',sectionName.toUpperCase());lastSection=sectionName;}
      var value=valueText(control);
      lines.push(labelFor(control.name)+': '+value);
    });
    lines.push('','Please review this registration carefully and send it to admin@littlewondersaustralia.com.');
    return lines.join('\n');
  }
  form.addEventListener('reset',function(){
    window.setTimeout(function(){
      status.className='form-status';
      status.textContent='';
      [].slice.call(form.querySelectorAll('.child-card.optional.is-visible')).forEach(function(card){card.classList.remove('is-visible');card.querySelectorAll('input,select,textarea').forEach(function(control){control.disabled=true;});});
      [].slice.call(form.querySelectorAll('[data-add-child]')).forEach(function(button){button.hidden=false;});
      syncPanels();
    },0);
  });
  form.addEventListener('submit',function(event){
    validateMinimums();
    if(!form.checkValidity()){
      event.preventDefault();
      form.reportValidity();
      status.className='form-status is-visible is-error';
      status.textContent='Please complete the highlighted required fields before preparing the registration.';
      return;
    }
    event.preventDefault();
    var type=form.getAttribute('data-form-type')||'Registration';
    var subject=encodeURIComponent('Little Wonders '+type+' registration');
    var body=encodeURIComponent(buildBody());
    status.className='form-status is-visible';
    status.textContent='Your email app should now open with the completed registration addressed to Little Wonders. Please review it and press Send.';
    window.location.href='mailto:admin@littlewondersaustralia.com?subject='+subject+'&body='+body;
  });
})();
