<template>
  <div>
    Launch Pad Cordinates: {{ launchPad.latitude }}
  </div>
  <div>
    Forecast Type: {{ forecast.value?.type }}
  </div>
  <div>
    Wind Speed: {{ forecastPeriod.windSpeed }}
  </div>
  <div>
    Short: {{ forecastPeriod.shortForecast }}
  </div>
  <div>
    Detailed: {{ forecastPeriod.detailedForecast }}
  </div>

</template>
<script setup lang="ts">
import {watch, reactive, computed} from "vue";
import { isWithinInterval } from 'date-fns';

const props = defineProps({
  launchPad: Object,
  launchTime: String
})
const { launchPad, launchTime } = toRefs(props)
const forecast = reactive({})
const { data: weatherInfo } = useFetch(`https://api.weather.gov/points/${launchPad.value.latitude},${launchPad.value.longitude}`, {})

const forecastPeriod = computed(()=> {
  // const period = forecast
  // const names = []
  // forecast.value?.periods.forEach(p => {
  //   console.log(p.name)
  //   names.push(p.name)
  // })

  const launchTimePeriod = forecast.value?.periods.find(period => {
    console.log('launchTimePeriod', launchTime.value)
    const alignedTimePeriod = isWithinInterval(new Date(launchTime.value), {
      start: new Date(period.startTime),
      end: new Date(period.endTime)
    })
    return alignedTimePeriod
  }) || {}

  console.log('launchTimePeriod', launchTimePeriod)

  return launchTimePeriod
});

watch(weatherInfo, (newPage)=>{
  if (weatherInfo.value?.properties?.forecast) {
    useFetch(weatherInfo.value.properties.forecast, {
      transform: (_res) => {
        return {
          periods: _res.properties.periods,
          type: _res.type
        }
      },
      server: false,
    }).then((res)=>{
      console.log('response', res.data)
      forecast.value = res.data
    })
  }
}, {
  deep: true,
  immediate:true
})


</script>
