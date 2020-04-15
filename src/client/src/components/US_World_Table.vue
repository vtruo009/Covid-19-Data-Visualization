<template>
  <div id="US_WORLD_Table">
    <b-table striped hover :items="this.data"></b-table>   
  </div>
</template>

<script>
export default {
    name: 'US_WORLD_Table',
    props: {
        data : Object
    },
    data() {
        return {
             items: [
                { date: '01/02/2020', number: 40},
                { date: '01/03/2020', number: 50},
                { date: '01/04/2020', number: 60},              
            ]
        }
    },
    methods:{
       
    },
    components:{
        
    }  
}
</script>

<style>

</style>