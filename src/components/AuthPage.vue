<template>
  <div>
    <div class="page">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-card class="pa-5">
              <v-card-title>Auth Page</v-card-title>
              <v-card-text>
                If you see this page it means you're authenticated user.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
  
 <script>
  export default {
    name: "AuthPage",
  };
 </script>