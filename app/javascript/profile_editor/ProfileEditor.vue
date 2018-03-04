<template>
  <div>
    <template v-if="!editName">
    {{profile.name}} <a href="#" @click.prevent="editName = true">edit</a>
    </template>
    <template v-else>
      <input type="text" v-model="nameEditionField" @keyup.enter.prevent="updateName" /> <a href="#" @click.prevent="updateName">save</a>
    </template>
    <hr />
    Skills :
    <ul>
      <li v-for="skill in profile.skills" :key="skill.id">{{skill.name}} <a href="#" @click.prevent="deleteSkill(skill.id)">x</a></li>
      <li><input type="text" v-model="newSkill" @keyup.enter.prevent="createSkill"> <a href="#" @click.prevent="createSkill">ajouter</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['id'],
  methods:{
    patchHelper(data, callback){
      let self = this;
      this.axios.patch(`/profiles/${this.id}`, data)
        .then(function(resp){
          self.profile = resp.data;
          if(callback) callback.call(self, resp); // le premier arg de call()
                                                  // définit ce que vaut 'this'
                                                  // dans la méthode callback
        })
    },
    deleteSkill(skillId){
      this.patchHelper({'profile': {'skills_attributes': [{'id': skillId, '_destroy': true}]}});
    },
    createSkill(){
      this.patchHelper({'profile': {'skills_attributes': [{'name': this.newSkill}]}},
        () => { this.newSkill = ""  })
    },
    updateName(){
      this.patchHelper({'profile': {'name': this.nameEditionField}},
        () => {
          this.nameEditionField = this.profile.name
          this.editName = false
        })
    }
  },
  created(){
    let self= this;
    this.axios.get(`/profiles/${this.id}`)
      .then(function(res){
        self.profile = res.data
        self.nameEditionField = self.profile.name
      })
  },
  data: function () {
    return {
      profile: {},
      newSkill: "",
      editName: false,
      nameEditionField: ""
    }
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
