<template>
  <v-container class="fill-height" align="centre" justify="space-around">
    <v-row justify="space-around">
      <v-card tile class="form-card" width="400">
        <v-card-title justify="space-around" class="justify-content-centre">
          <div>Log in to your account</div>
        </v-card-title>
        <v-card-text>
          <form>
            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              label="Enter email"
              required
              outlined
              dense
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="name"
              type="password"
              label="Enter password"
              required
              outlined
              dense
              :error-messages="nameErrors"
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            ></v-text-field>
          </form>
          <v-btn
            dark
            block
            class="mb-4"
            style="background-color: #0052cc"
            @click="submit"
          >
            Login
          </v-btn>
          <div>OR</div>
          <v-btn light block class="my-4 white" @click="submit">
            <span class="logo">
              <v-icon left style="color: rgb(153 6 213); font-size: 24px">
                mdi-account
              </v-icon>
            </span>
            Continue as Guest
          </v-btn>
          <v-btn light block class="my-4 white" @click="submit">
            <span class="logo">
              <v-img
                width="20"
                src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.331/static/media/google-logo.e086107b.svg"
              ></v-img>
            </span>
            Continue with Google
          </v-btn>
          <v-btn light block class="my-4 white" @click="submit">
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
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    select: { required },
    checkbox: {
      checked(val) {
        return val;
      },
    },
  },

  data: () => ({
    name: "",
    email: "",
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
  }),

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = false;
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
