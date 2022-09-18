<template>
  <div class="code-playground">
    <v-navigation-drawer
      absolute
      dark
      mini-variant
      mini-variant-width="60"
      permanent
    >
      <v-list nav dense>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-star</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <div
      class="code-conatainer"
      :style="{ height: `${mainContainerHeight}px` }"
    >
      <CodeEditor :height="mainContainerHeight" :socket="socket" />
    </div>
    <v-btn
      v-show="showChatBox == false"
      class="mx-2"
      fab
      dark
      color="cyan"
      style="position: absolute; bottom: 20px; right: 20px"
      @click="showChatBox = true"
    >
      <v-icon dark> mdi-chat </v-icon>
    </v-btn>
    <ChatBox
      :socket="socket"
      :showChatBox="showChatBox"
      @chatboxClosed="showChatBox = false"
    />
    <v-footer dark app color="rgb(0, 32, 42)">
      <div>This is the footer</div>
    </v-footer>
  </div>
</template>

<script>
import CodeEditor from "../components/CodeEditor.vue";
import ChatBox from "../components/ChatBox.vue";
import { io } from "socket.io-client";
import { mapGetters } from "vuex";

export default {
  components: {
    CodeEditor,
    ChatBox,
  },
  data() {
    return {
      mainContainerHeight: 0,
      socket: io("http://192.168.0.136:3000/"),
      users: [],
      showChatBox: false,
    };
  },
  computed: {
    ...mapGetters(["getLoggedInUser"]),
  },
  methods: {
    setHeight() {
      var navContainer = document.querySelector(".v-navigation-drawer");
      this.mainContainerHeight =
        navContainer != undefined ? navContainer.clientHeight - 33 : 500;
      console.log("mainContainerHeight", this.mainContainerHeight);
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.setHeight);
    localStorage.clear();
  },
  beforeMount() {
    console.log("beforeMount", this.getLoggedInUser);
    if (this.getLoggedInUser.firstName == "") {
      var roomId = this.$route.params.roomId;
      this.$router.push({ name: "Login", query: { roomId: roomId } });
    }
  },
  mounted() {
    window.addEventListener("resize", this.setHeight);
    this.setHeight();

    //Sending request to server
    this.socket.emit("joinRoom", this.getLoggedInUser);

    //Receiving response from server
    this.socket.on("roomUsers", (payload) => {
      this.users = payload;
      console.log("Connection established successfully.");
    });
  },
};
</script>

<style scoped>
.code-conatainer {
  padding-left: 60px;
  padding-top: 0;
  padding-right: 0;
  padding-bottom: 0;
}
.theme--dark.v-navigation-drawer {
  background-color: #003847;
}
</style>
