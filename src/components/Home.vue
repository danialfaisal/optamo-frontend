<template>
  <main>
    <v-container fluid grid-list-md fill-height>
      <v-layout column>
        <v-flex md6>

          <v-card-title>
            Weather History
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
            ></v-text-field>
          </v-card-title>

          <v-data-table
                  :headers="headers"
                  :items="weather"
                  :search="search"

                  hide-actions
                  class="elevation-1"
                  fixed
                  style="max-height: 300px; overflow-y: auto"
          >

            <template slot="items" slot-scope="props" >
              <td>{{ props.item.station_id }}</td>
              <td>{{ props.item.state }}</td>
              <td nowrap="true">{{ props.item.precipitation }}</td>
              <td nowrap="true">{{ props.item.temp_min }}</td>
              <td nowrap="true">{{ props.item.temp_max }}</td>
              <td nowrap="true">{{ props.item.snowfall }}</td>

            </template>

          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>

  </main>
</template>


<script>

  import router from '../router';
  import {APIService} from '../http/APIService';
  const apiService = new APIService();

  export default {
    name: "WeatherList",
    data () {
      return {
        weather: [],
        validUserName: "Guest",
        weatherSize: 0,
        search: '',
        headers: [
          {
            text: 'Station ID',
            align: 'left',
            sortable: true,
            value: 'station_id'
          },
          {text: 'State', sortable: true, align: 'left', value: 'state'},
          {text: 'Precipitation', sortable: false, align: 'left',},
          {text: 'Min Temperature', sortable: true, align: 'left', value: 'temp_min'},
          {text: 'Max Temperature', sortable: false, align: 'left',},
          {text: 'Snowfall', sortable: false, align: 'left',},
        ],
      }

    },
    mounted() {
      this.getWeather();
      this.showMessages();
    },
    methods: {
      getWeather() {
        apiService.getWeatherList().then(response => {
          this.weather = response.data.data;
          this.weatherSize = this.weather.length;
          if (localStorage.getItem("isAuthenticates")
                  && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
            this.validUserName = JSON.parse(localStorage.getItem("log_user"));
          }
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('isAuthenticates');
            localStorage.removeItem('log_user');
            localStorage.removeItem('token');
            router.push("/auth");
          }
        });
      },
    }
  }
</script>