const MAX_DES = 30;
const API_URL = "http://0.0.0.0:5001/api/v1/";
const amenities = {};
$(document).ready(function () {
  $("input[type=checkbox]").change(handle_amenities);
  $("input[type=checkbox]").each(handle_amenities);
  $.ajax({
    type: "GET",
    url: API_URL + "status",
    success: function (res) {
      if (res?.status === "OK") $("div#api_status").addClass("available");
      else $("div#api_status").removeClass("available");
    },
  });
});

function handle_amenities(e) {
  const self = $(this);
  if ($(this).is(":checked"))
    amenities[self.attr("data-id")] = self.attr("data-name");
  else if (amenities[self.attr("data-id")])
    delete amenities[self.attr("data-id")];
  let new_text = Object.values(amenities).join(", ");
  if (new_text.length > MAX_DES)
    new_text = new_text.slice(0, MAX_DES - 3) + "...";
  $("div.amenities h4").html(new_text.length > 0 ? new_text : "&nbsp;");
}
