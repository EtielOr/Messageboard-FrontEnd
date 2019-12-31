<template>
  <div class="newPost">
        <div v-if="hasError" >
          <displayError   v-bind:errors="errors" />
        </div>
        <form @submit="addNewPost">
            <label for="title"> title: </label>
          <p>
            <input type="text" v-model="title" name="title" > 
          </p>
            <label for="message"> message: </label>
          <p>
            <textarea v-model="message" name="message" cols="50" rows="10" />
          </p>
        <input type="submit" value="Submit">
      </form>
  </div>
</template>

<script>
import axios from 'axios'
import displayError from '../components/displayError'
export default {
    name: "newPost",
    components: {
        displayError
    },
      data () {
    return {
      title: null,
      message : null,
      hasError: false,
      errors: null }
    },
    methods : {
        addNewPost(e) {
        e.preventDefault();
        this.hasError = false;
        this.errors = null;

        const newMessagge = {
          "title" : this.title , "message" : this.message
        }        
        axios.post('http://localhost:9000/api/post',newMessagge)
        .then(( ) =>  this.$router.push("/"))
        .catch(err => {
          this.errors = err.response.data.errors;
          this.hasError = true; 
          });
      }
    }
}
</script>

