<template>
  <div id="code-editor">
    <prism-editor
      class="my-editor height-300"
      v-model="code"
      :highlight="highlighter"
      :line-numbers="true"
      :style="{ height: `${height}px` }"
      @keyup="updateCode"
    ></prism-editor>
  </div>
</template>

<script>
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css";

import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";
import { mapGetters } from "vuex";

export default {
  name: "CodeEditor",
  components: {
    PrismEditor,
  },
  props: ["height", "socket"],
  data: () => ({
    code: 'console.log("Hello World")',
    lineNumbers: true,
  }),
  mounted() {
    this.socket.on("codeUpdated", (payload) => {
      console.log("codeUpdated", payload);
      if (payload.text) {
        this.code = payload.text;
      }
    });
  },
  computed: {
    ...mapGetters(["getLoggedInUser"]),
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages.js); //returns html
    },
    updateCode() {
      this.socket.emit("codeUpdated", {
        userId: this.getLoggedInUser.id,
        text: this.code,
      });
    },
  },
};
</script>

<style lang="scss">
// required class
.my-editor {
  background: #073642;
  color: #ccc;
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

// optional
.prism-editor__textarea:focus {
  outline: none;
}

// not required:
.height-300 {
  height: 100px;
}
</style>
