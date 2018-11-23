$(document).foundation()

$("#toggle-advanced").click(function () {
  if ($('#toggle-advanced').is(':checked')) {
    $('#advanced').removeClass('hide');
    $('#toggle-advanced-label').html("Hide advanced options");
  }
  else {
    $('#advanced').addClass('hide');
    $('#toggle-advanced-label').html("Show advanced options");
  }
});


$('#show-password').click(function () {
  var output = document.getElementById('mpw-output')
  if (output.type == 'password') {
    output.type = 'text';
    $('#show-password-icon').removeClass('fa-eye-slash')
    $('#show-password-icon').addClass('fa-eye')
  }
  else if (output.type == 'text') {
    output.type = 'password';
    $('#show-password-icon').removeClass('fa-eye')
    $('#show-password-icon').addClass('fa-eye-slash')
  }
});


$("#generate").click(function () {

  urlstr = "?a=" + $('#mpw-algorithm').val() + "&v=" + $('#mpw-version').val() + "&c=" + $('#mpw-counter').val() + "&n=" + $('#mpw-name').val();

  history.pushState(null, "", encodeURI(urlstr));

  $('#error').hide();

  var name = $('#mpw-name').val();
  var site = $('#mpw-site').val();
  var pass = $('#mpw-masterpass').val();
  var ver = $('#mpw-version').val();
  var count = $('#mpw-counter').val();
  var alg = $('#mpw-algorithm').val();

  if (name == '') {
    $('#mpw-name').addClass('invalid');
  }
  if (site == '') {
    $('#mpw-site').addClass('invalid');
  }
  if (pass == '') {
    $('#mpw-masterpass').addClass('invalid');
  }
  if (!name || !site || !pass) {
    $('#error-text').html('Please fill out required fields');
    $('#error').show();
    return;
  }

  $('#generate-icon').addClass('fa-spin')

  var mpw = new MPW(name, pass, ver);
  var promise = mpw.generate(site, count, "", alg);

  promise.then(function (pass) {
    $('#generate-icon').removeClass('fa-spin');
    $('#output-dispaly').removeClass('hide');
    $('#mpw-output').val(pass);
  });

});


$("#copy-password").click(function () {
  $('#mpw-output-temp').val($('#mpw-output').val());
  var copyText = document.getElementById("mpw-output-temp");
  copyText.select();
  document.execCommand("copy");
  //$('#mpw-output-temp').val('');

  alert('Copied generated password');
});

function getURL() {
  var vars = {};
  var parts = window.location.href.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    function(m,key,value) {
      vars[key] = value;
    }
  );
  return vars;
}

var urlparams = getURL();

if (urlparams['n']) {
  $('#mpw-name').val(decodeURI(urlparams['n']));
}

if (urlparams['v']) {
  $('#mpw-version').val(urlparams['v']);
}

if (urlparams['c']) {
  $('#mpw-counter').val(urlparams['c']);
}

if (urlparams['a']) {
  $('#mpw-algorithm').val(urlparams['a']);
}
