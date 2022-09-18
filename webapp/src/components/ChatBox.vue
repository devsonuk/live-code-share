<template>
  <div class="chat-box" v-show="showChatBox">
    <v-card class="mx-auto fill-height" width="100%">
      <v-card-title class="pt-2 pb-2">
        Messaging
        <span style="position: absolute; right: 8px" @click="closeChatbox">
          <v-icon>mdi-close</v-icon>
        </span>
      </v-card-title>
      <v-card-text class="chat-area">
        <v-container fluid style="padding: 0">
          <v-list disabled two-line style="background: transparent">
            <v-list-item-group>
              <v-list-item v-for="(item, i) in messages" :key="i">
                <v-list-item-avatar v-if="item.avatar == 'bot'">
                  <v-img
                    v-if="item.avatar == 'bot'"
                    src="../assets/chatbot.png"
                  ></v-img>
                </v-list-item-avatar>
                <v-list-item-avatar v-else color="#003847">
                  <span class="white--text text-h6">{{ item.avatar }}</span>
                </v-list-item-avatar>
                <v-list-item-content
                  style="
                    background: #f5f5f5;
                    border-radius: 12px;
                    padding: 10px;
                  "
                >
                  <v-list-item-title>{{ item.username }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.text }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-container>
      </v-card-text>
      <v-footer style="padding: 1px">
        <Input
          v-model="message"
          placeholder="Write a message..."
          clearable
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 6 }"
          style="width: 100%"
          @on-enter="sendMessage"
        />
      </v-footer>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["socket", "showChatBox"],
  data() {
    return {
      // showChatBox: true,
      messages: [],
      message: "",
    };
  },
  mounted() {
    this.socket.on("message", (payload) => {
      if (payload.text) {
        this.messages.push(payload);
      }
    });
  },
  updated() {
    var chatArea = document.querySelector(".chat-area");
    chatArea.scrollTop = chatArea.scrollHeight;
  },
  computed: {
    ...mapGetters(["getLoggedInUser"]),
  },
  methods: {
    closeChatbox() {
      this.$emit("chatboxClosed");
    },
    sendMessage() {
      //Emitting a event to server
      if (this.message != "" && this.message != "\n") {
        this.socket.emit("chatMessage", {
          userId: this.getLoggedInUser.id,
          text: this.message,
        });
        this.message = "";
      }
    },
  },
};
</script>

<style scoped>
.chat-box {
  position: absolute;
  width: 400px;
  bottom: 10px;
  right: 10px;
  min-height: 500px;
}
.chat-area {
  background-color: #e6eaea;
  padding: 0;
  height: 400px;
  overflow-y: scroll;
  scroll-behavior: smooth;
}
.message-box .v-text-field__details {
  display: none;
}
</style>
