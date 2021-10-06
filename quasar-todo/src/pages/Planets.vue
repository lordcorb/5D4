<template>
  <div class="q-pa-md row q-gutter-md justify-content">
    <q-card bordered class="col-2"
    v-for="planet in planets"
    :key="planet.href">
        <q-card-section>
            <q-img :src="planet.icon" spinner-color="red"/>    
            <router-link :to="{name:'detailPlanet', query:{planet: planet.href}}">
                <h6 class="text-center">{{planet.name}}</h6>
            </router-link>
        </q-card-section>
    </q-card>
  </div>
</template>

<script>

import { defineComponent, ref, onMounted } from 'vue';
import { api } from 'boot/axios';

const BASEURL = 'https://api.andromia.science'; 

export default defineComponent({
    setup(){
        const planets = ref([]);

        onMounted(async () => {
            const response = await api.get(`${BASEURL}/planets`);
            if(response.status === 200){
                planets.value = response.data;
            }
        });

        return{
            planets
        }
    }
});

</script>

<style>

</style>