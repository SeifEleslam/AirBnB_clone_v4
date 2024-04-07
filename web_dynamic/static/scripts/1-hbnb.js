const MAX_DES = 30;
const amenities = {};
$(document).ready(function () {
  $("input[type=checkbox]").change(handle_amenities);
  $("input[type=checkbox]").each(handle_amenities);
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
