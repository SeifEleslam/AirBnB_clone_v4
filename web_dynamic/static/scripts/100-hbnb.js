const MAX_DES = 30;
const API_URL = "http://0.0.0.0:5001/api/v1/";
const amenities = {};
const states = {};
const cities = {};
$(document).ready(function () {
  $("div.amenities input[type=checkbox]").change(handle_amenities);
  $("div.amenities input[type=checkbox]").each(handle_amenities);
  $("div.locations input[type=checkbox]").change(handle_cities_and_states);
  $("div.locations input[type=checkbox]").each(handle_cities_and_states);
  $("button").click(() => fetch_places(body()));
  fetch_status();
  fetch_places(body());
});

// LOGIC

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
function handle_cities_and_states(e) {
  const self = $(this);
  const ref = self.attr("data-type") === "state" ? states : cities;
  if ($(this).is(":checked"))
    ref[self.attr("data-id")] = self.attr("data-name");
  else if (ref[self.attr("data-id")]) delete ref[self.attr("data-id")];
  let new_text = Object.values({ ...states, ...cities }).join(", ");
  if (new_text.length > MAX_DES)
    new_text = new_text.slice(0, MAX_DES - 3) + "...";
  $("div.locations h4").html(new_text.length > 0 ? new_text : "&nbsp;");
}

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

function list_places(places) {
  $("section.places").html("");
  for (let place of places) $("section.places").append(place_temp(place));
}

// FETCHES

function fetch_status() {
  $.ajax({
    type: "GET",
    url: API_URL + "status",
    success: function (res) {
      if (res?.status === "OK") $("div#api_status").addClass("available");
      else $("div#api_status").removeClass("available");
    },
  });
}

function fetch_places(body) {
  $.ajax({
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(body ?? {}),
    dataType: "json",
    url: API_URL + "places_search",
    success: function (res) {
      list_places(res);
    },
  });
}

const body = () => ({
  amenities: Object.keys(amenities),
  states: Object.keys(states),
  cities: Object.keys(cities),
});

const place_temp = (place) => `
        <article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">
              ${place.max_guest} Guest${place.max_guest != 1 ? "s" : ""}
            </div>
            <div class="number_rooms">
              ${place.number_rooms} Bedroom${place.number_rooms != 1 ? "s" : ""}
            </div>
            <div class="number_bathrooms">
              ${place.number_bathrooms} Bathroom${
  place.number_bathrooms != 1 ? "s" : ""
}
            </div>
          </div>
          <div class="description">${place.description}</div>
        </article>`;
