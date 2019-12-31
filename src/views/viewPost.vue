<template>
    <div class="post">
        <div v-if="hasError" >
          <displayError   v-bind:errors="errors" />
        </div>
        <form @submit="postComment">
            message: <br>
            <textarea v-model="message" name="message" />  <br>
            <input type="submit" value="Submit">
        </form>
        <br><br>
          <table>
            <thead>
                <tr>
                    <th width="85%"> post </th>
                    <th> created date </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                    <h1> {{this.post.title}} </h1> <br>
                    {{this.post.message}}
                    </td>
                    <td> {{this.post.createdDate}} </td>
                </tr>
                <tr v-bind:key="comment.id" v-for="comment in comments">
                    <td> {{comment.message}} </td>
                    <td> {{comment.createdDate}} </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
import axios from 'axios'
import {fixDate} from '../components/fixDate'
import displayError from '../components/displayError'
import {apiUrl} from '../apiUrl'

export default {
    name: 'viewPost',
    components : {
        displayError
    },
   data() {
        return {
            post : {} ,
            comments : [],
            message : null,
            hasError: false,
            errors: null
        }
    },
    beforeCreate() {
        axios.get( apiUrl +'/post/' + this.$route.params.id)
        .then(res => {
            this.post = res.data;
            this.post.createdDate = fixDate(this.post.createdDate);
            })
           .catch( () => {this.$router.push("/"); })
        .then( () =>{ 
            axios.get( apiUrl + '/post/' + this.$route.params.id + '/comment' )
            .then(res => {
                this.comments = res.data.map((val) => {
                    let comment = val;
                    comment.createdDate = fixDate(comment.createdDate);
                    return comment;
                })

            })
            .catch(err => {
                     this.errors = err.response.data.errors;
                     this.hasError = true; 
                     })
               });
    },
    methods : {
        postComment(e) {
            e.preventDefault();
            this.hasError = false;
            this.errors = null;
            const newComment = {
                "message" : this.message
            }     

            axios.post(apiUrl + '/post/' + this.post.id, newComment)
            .catch(err => {
                    console.log(err.response);
                     this.errors = err.response.data.errors;
                     this.hasError = true; 
                     })
        }
    }
}
</script>


<style scoped>
table {
    margin-left: 15%;
    margin-right: 15%;
    border-collapse: collapse; 
    border-spacing: 0px;
    border: 1px solid black;
}

th , td {
    border: 1px solid black;
}
td {
    padding: 5px;
    text-align: left;
}

</style>