<template>
    <div class="q-pa-md">
        <q-carousel v-model="slide"
                    vertical
                    control-type="flat"
                    transition-prev="slide-down"
                    transition-next="slide-up"
                    swipeable
                    animated
                    control-color="white"
                    navigation-icon="radio_button_unchecked"
                    navigation
                    padding
                    arrows
                    height="300px"
                    class="bg-primary text-white shadow-1 rounded-borders">
            <q-carousel-slide name="style" class="column no-wrap flex-center">
                <q-icon name="style" size="56px"/>
                <div class="q-mt-md text-center">
                    {{ lorem }}
                </div>
            </q-carousel-slide>
            <q-carousel-slide name="tv" class="column no-wrap flex-center">
                <q-icon name="live_tv" size="56px"/>
                <div class="q-mt-md text-center">
                    {{ lorem }}
                </div>
            </q-carousel-slide>
            <q-carousel-slide name="layers" class="column no-wrap flex-center">
                <q-icon name="layers" size="56px"/>
                <div class="q-mt-md text-center">
                    {{ lorem }}
                </div>
            </q-carousel-slide>
            <q-carousel-slide name="map" class="column no-wrap flex-center">
                <q-icon name="terrain" size="56px"/>
                <div class="q-mt-md text-center">
                    {{ lorem }}
                </div>
            </q-carousel-slide>
        </q-carousel>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        data() {
            return {
                slide: 'style',
                lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.'
            }
        }
    }
</script>