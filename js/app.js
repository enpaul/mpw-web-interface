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


$("#generate").click(function () {

  $('#error').hide();

  name = $('#mpw-name').val();
  site = $('#mpw-site').val();
  pass = $('#mpw-masterpass').val();
  ver = $('#mpw-version').val();
  count = $('#mpw-counter').val();
  alg = $('#mpw-algorithm').val();

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

  mpw = new MPW(name, pass, ver);
  promise = mpw.generate(site, count, "", alg);

  promise.then(function (pass) {
    $('#output-dispaly').removeClass('hide');
    $('#mpw-output').val(pass);
  });

});
