<template>
  <div class="home">
          <Posts v-bind:in_posts="posts"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Posts from '../components/Posts'
import axios from 'axios'
import {apiUrl} from '../apiUrl'

export default {
  name: 'home',
  components: {
    Posts
  },
  data () {
    return {
      posts : []
       }
  },
  created() {
    this.loadPosts();
  },
  methods : {
    loadPosts() 
    {
        axios.get( apiUrl + '/post')
        .then(res => this.posts = res.data );
    }
  }
}
</script>

