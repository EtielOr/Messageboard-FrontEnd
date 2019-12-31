<template>
    <div class="post_list">
        <table>
            <thead>
                <tr>
                    <th width="85%"> title </th>
                    <th> created date </th>
                </tr>
            </thead>
            <tbody>
                <tr v-bind:key="post_preview.id" v-for="post_preview in post_list">
                    <td> <router-link :to="'post/' + post_preview.id"> 
                        {{post_preview.title}} 
                        </router-link> 
                    </td>
                    <td> {{post_preview.createdDate}} </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
import {fixDate} from "./fixDate"

export default {
    name: "Posts", 
    components : {
       // PostPreviewRow
    },
    props: ["in_posts"],
    data() {
        return { post_list : [] }
    },

    created() {
        this.post_list = this.fixDisplayDates(this.in_posts);
    },
    watch: {
        in_posts: function post(oldList,) {
            this.post_list = this.fixDisplayDates(oldList);
        }
    },
    methods: {
        fixDisplayDates(data) {
            return data.map( (val) => {
                let tempVal = val;
                tempVal.createdDate = fixDate(tempVal.createdDate);
                return tempVal
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
