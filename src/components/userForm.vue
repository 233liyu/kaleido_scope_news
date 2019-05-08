<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input id="input-2" v-model="form.name" required placeholder="Enter name"></b-form-input>
      </b-form-group>

      <b-form-group id="birthday-gp" label="Birthday:" label-for="birthday">
        <b-form-input id="birthday" v-model="form.birthday" type="date" required></b-form-input>
      </b-form-group>

      <b-form-group id="gender-gp" label="Gender:" label-for="gender">
        <b-form-select id="gender" v-model="form.gender" :options="genders" required></b-form-select>
      </b-form-group>

      <b-form-group id="vocation" label="Your Vocation:" label-for="vocation">
        <b-form-input id="vocation" v-model="form.vocation" required placeholder="Enter Vocation"></b-form-input>
      </b-form-group>

      <pre>Location:</pre>
      <b-form-group
        id="input-group-3"
        label-cols-sm="3"
        label-align-sm="right"
        label="Continent:"
        label-for="Continent"
      >
        <b-form-select
          id="Continent"
          v-model="form.location.continent"
          :options="continents"
          v-on:change="onUpdate($event, 'country')"
          required
        ></b-form-select>
      </b-form-group>

      <!-- conuntry -->
      <b-form-group
        id="input-group-3"
        label-cols-sm="3"
        label-align-sm="right"
        label="Country:"
        label-for="countries"
      >
        <b-form-select
          id="countries"
          v-model="form.location.countries"
          :options="countries"
          required
          v-bind:disabled="countries.length == 0"
          v-on:change="onUpdate($event, 'state')"
        ></b-form-select>
      </b-form-group>
      <!-- state -->
      <b-form-group
        id="input-group-3"
        label-cols-sm="3"
        label-align-sm="right"
        label="State / Provience:"
        label-for="state"
      >
        <b-form-select
          id="state"
          v-model="form.location.state"
          :options="state"
          required
          v-bind:disabled="state.length == 0"
          v-on:change="onUpdate($event, 'county')"
        ></b-form-select>
      </b-form-group>

      <!-- county -->
      <b-form-group
        id="county"
        label-cols-sm="3"
        label-align-sm="right"
        label="County / City:"
        label-for="state"
      >
        <b-form-select
          id="county"
          v-model="form.location.county"
          :options="county"
          required
          v-bind:disabled="county.length == 0"
        ></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
    </b-form>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
export default {
  name: "user-form",
  data() {
    return {
      form: {
        name: "",
        vocation: "",
        gender: null,
        birthday: null,
        location: {},
        vocation: null
      },
      genders: [
        { text: "Select One", value: null },
        { text: "Male | Man", value: 'male' },
        { text: "Female | Woman", value: 'female' }
      ],
      foods: [
        { text: "Select One", value: null },
        "Carrots",
        "Beans",
        "Tomatoes",
        "Corn"
      ],
      continents: [
        { text: "Select One", value: null },
        { text: "Africa", value: 6255146 },
        { text: "Antarctica", value: 6255152 },
        { text: "Asia", value: 6255147 },
        { text: "Europe", value: 6255148 },
        { text: "North America", value: 6255149 },
        { text: "Oceania", value: 6255151 },
        { text: "South America", value: 6255150 }
      ],
      countries: [],
      state: [],
      county: [],
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      var location = this.form.location;
      // console.log(this.countries);
      // replace name and value
      location.continent = this.continents.find(function(element) {
        return element.value == location.continent;
      }).text;
      location.countries = this.countries.find(function(element) {
        return element.value == location.countries;
      }).text;
      location.state = this.state.find(function(element) {
        return element.value == location.state;
      }).text;
      location.county = this.county.find(function(element) {
        return element.value == location.county;
      }).text;
      var adp_form = Object();
      adp_form.alias = this.form.name;
      adp_form.country = location.countries;
      adp_form.state = location.countries;
      adp_form.city = location.county;
      adp_form.birth_date = this.form.birthday;
      adp_form.gender = this.form.gender;
      adp_form.vocation = this.form.vocation;

      var querystring = require('querystring');
      console.log(adp_form);

      // this.$http.post('/cs584vm6/kaleidoscope/insertNewUserInformation', querystring.stringify(adp_form));

      localStorage.user = JSON.stringify(adp_form)

      this.$emit('updated_user');
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    onUpdate: function($event, region) {
      var rtn_value = $event;
      if (rtn_value == null) {
        return;
      }
      var that = this;

      switch (region) {
        case "country":
          that.countries = Array();
          that.state = Array();
          that.county = Array();
          break;
        case "state":
          that.state = Array();
          that.county = Array();
          break;
        case "county":
          that.county = Array();
          break;
        default:
          break;
      }

      this.$http
        .get("/cs584vm6/geoname_api", {
          params: {
            geonameId: rtn_value,
            username: "233liyu",
            style: "long"
          }
        })
        .then(function(response) {
          if (response.status == 200) {
            var rtn_data = Array();
            var result = response.data.geonames;
            result.forEach(element => {
              rtn_data.push({ text: element.name, value: element.geonameId });
            });

            switch (region) {
              case "country":
                that.countries = rtn_data;
                break;
              case "state":
                that.state = rtn_data;
                break;
              case "county":
                that.county = rtn_data;
                break;
              default:
                break;
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted: function(evt) {
    console.log(evt);
    var adp_form = Object();
    adp_form.alias = null;
    adp_form.country = null;
    adp_form.state = null;
    adp_form.city = null;
    adp_form.birth_date = '0000-00-00';
    adp_form.gender = null;
    adp_form.vocation = null;

    localStorage.user = JSON.stringify(adp_form)
  }
};
</script>