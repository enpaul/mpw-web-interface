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

  name = $('#mpw-name').val();
  site = $('#mpw-site').val();
  pass = $('#mpw-masterpass').val();
  ver = $('#mpw-version').val();
  count = $('#mpw-counter').val();
  alg = $('#mpw-algorithm').val();

  mpw = new MPW(name, pass, ver);
  promise = mpw.generate(site, count, "", alg);

  promise.then(function (pass) {
    $('#output-dispaly').removeClass('hide');
    $('#mpw-output').val(pass);
  });

});
