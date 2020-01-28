<template>
  <div class="hello">
    <div class="input-container">
      <h1>today,i</h1>

      <form novalidate @submit.prevent>
        <input type="text"
          v-model="todayText"
          placeholder="What did you do today?"
          autofocus
          autocomplete="off"
        />
        <div class="date">{{ curDate }}</div>

        <div
          class="photoPlaceholder"
          :class="{ fullSize : photoUploaded }"
          @click="triggerUploadDialog"
        >
          <span>add a photo</span>
          <img v-if="imgSrc" :src="imgSrc" />
        </div>
        <input type="file" name="photo" ref="photoUpload" id="photo" @change="handleUpload" />

        <button
          class="inactive save"
          :class="{active : photoUploaded || todayText}"
          type="submit"
          :disabled="photoUploaded || todayText ? false : true"
          @click="handleSave"
        >Save</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todayText: '',
      imgSrc: '',
      photoUploaded: false,
      photo: '',
    };
  },
  methods: {
    triggerUploadDialog() {
      this.$refs.photoUpload.click();
    },
    handleUpload(event) {
      const upload = event.target;
      const reader = new FileReader();

      reader.onload = () => {
        // get upload result
        const dataURL = reader.result;
        // set photoUploaded to true to style Upload button
        this.photoUploaded = true;

        // insert uploaded photo
        this.imgSrc = dataURL;

        this.photo = upload.files;
      };
      reader.readAsDataURL(upload.files[0]);
    },
    handleSave() {

    },
  },
  computed: {
    curDate() {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
      const yyyy = today.getFullYear();

      today = `${mm}/${dd}/${yyyy}`;
      return today;
    },
  },
};
</script>

<style lang="scss" scoped>
.hello {
  color: #8ea8c3;
}
.input-container {
  position: relative;
}

.photoPlaceholder {
  border: 1px dashed #8ea8c3;
  width: 280px;
  height: 80px;
  margin: auto;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-bottom: 2rem;

  &.fullSize {
    height: 300px;
  }

  img {
    position: absolute;
    top: -25px;
    left: -25px;
    width: 350px;
    height: 350px;
  }
}

input {
  font-family: 'Crete Round', serif;
  border: none;
  outline: none;
  background: none;
  color: #8ea8c3;
  font-size: 1.25rem;
  transition: .2s linear;
  border-bottom: 1px dashed #8ea8c3;
  width: 280px;

  @media screen and (min-width: 768px) {
    width: 400px;
  }

  &::placeholder {
    color: rgba(#8ea8c3, .6);
    text-align: center;
  }


  &[type='file'] {
    display: none;
  }
}

.date {
  color: #8ea8c3;
  font-size: 0.825rem;
  padding-top: 0.5rem;
  text-align: center;
  margin-bottom: 3rem;
}

.save {
  font-size: 0.825rem;
  border-radius: 4px;
  color: #8ea8c3;
  border: 1px dashed #8ea8c3;
  background: none;
  -webkit-appearance: none;
  padding: 0.75rem 1.5rem;
  text-align: center;
  cursor: not-allowed;

  &.active {
    cursor: pointer;
    background: #8ea8c3;
    color: #406e8e;
  }
}
</style>
