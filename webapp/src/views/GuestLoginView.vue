<template>
  <v-container class="fill-height" align="centre" justify="space-around">
    <v-row justify="space-around">
      <v-card tile class="form-card" width="400">
        <v-card-title justify="space-around" class="justify-content-centre">
          <div>Log in as Guest</div>
        </v-card-title>
        <v-card-text>
          <form>
            <v-text-field
              v-model="firstName"
              label="Enter First Name"
              required
              outlined
              dense
              :error-messages="firstNameErros"
              @input="$v.firstName.$touch()"
              @blur="$v.firstName.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="lastName"
              :error-messages="lastNameErros"
              label="Enter Last Name"
              required
              outlined
              dense
              @input="$v.lastName.$touch()"
              @blur="$v.lastName.$touch()"
            ></v-text-field>
          </form>
          <v-btn
            dark
            block
            class="mb-4"
            style="background-color: #0052cc"
            @click="submit"
          >
            Continue as Guest
          </v-btn>
          <div>OR</div>
          <v-btn light block class="my-4 white" @click.prevent="submit">
            <span class="logo">
              <v-icon left style="color: rgb(153 6 213); font-size: 24px">
                mdi-account
              </v-icon>
            </span>
            Continue with Email
          </v-btn>
          <v-btn light block class="my-4 white" @click.prevent="submit">
            <span class="logo">
              <v-img
                width="20"
                src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.331/static/media/google-logo.e086107b.svg"
              ></v-img>
            </span>
            Continue with Google
          </v-btn>
          <v-btn light block class="my-4 white" @click.prevent="submit">
            <span class="logo">
              <v-icon left style="color: blue; font-size: 24px">
                mdi-facebook
              </v-icon>
            </span>
            Continue with Facebook
          </v-btn>
          <v-divider class="mt-6 mb-4"></v-divider>
          <div style="color: rgb(0, 82, 204)">
            <span>Can't log in?</span>
            Sign up for an account
          </div>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";
import { mapGetters, mapMutations } from "vuex";
import { nanoid } from "nanoid";

export default {
  mixins: [validationMixin],

  validations: {
    firstName: { required, maxLength: maxLength(10) },
    lastName: { required, maxLength: maxLength(10) },
  },

  data: () => ({
    firstName: "",
    lastName: "",
    roomId: "",
    userId: "",
  }),
  computed: {
    ...mapGetters(["getLoggedInUser", "getRoomId"]),
    firstNameErros() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.required && errors.push("First Name is required.");
      return errors;
    },
    lastNameErros() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.required && errors.push("Last Name is required.");
      return errors;
    },
  },
  methods: {
    ...mapMutations(["setLoggedInUser", "setRoomId"]),
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      console.log("this.$route.query", this.$route.query);
      if (this.$route.query.roomId) {
        //Id already assigned
        this.roomId = this.$route.query.roomId;
      } else {
        //Assigning new room id
        this.roomId = nanoid();
        this.setRoomId(this.roomId);
      }
      var loggedInUser = {
        id: nanoid(10),
        roomId: this.roomId,
        firstName: this.firstName,
        lastName: this.lastName,
        fullName: `${this.firstName} ${this.lastName}`,
        avatar: `${this.firstName[0]}${this.lastName[0]}`,
        avatarType: "text",
      };
      this.setLoggedInUser(loggedInUser);
      console.log("loggedInUser", loggedInUser);
      this.$router.push({
        name: "Editor",
        params: { roomId: this.roomId },
      });
    },
    clear() {
      this.$v.$reset();
      this.firstName = "";
      this.lastName = "";
    },
  },
};
</script>

<style scoped>
.form-card {
  text-align: center;
  justify-content: center;
}
.form-card .v-card__title {
  justify-content: center;
}
.logo {
  position: absolute;
  left: 0;
}
.v-btn {
  text-transform: none;
}
</style>
