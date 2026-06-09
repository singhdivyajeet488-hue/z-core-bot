const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const Database = require('better-sqlite3');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
  ]
});

client.commands = new Collection();
client.cooldowns = new Collection();
client.db = new Database(process.env.DATABASE_PATH || './database.sqlite');

// Load handlers
const handlers = ['command', 'event', 'database', 'dashboard'];
handlers.forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

// Anti crash
process.on('unhandledRejection', error => {
  console.error('Unhandled Rejection:', error);
});

process.on('uncaughtException', error => {
  console.error('Uncaught Exception:', error);
});

client.login(process.env.TOKEN);

// Dashboard setup - separate process or integrated
// For full, but here stub integrated
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(session({ secret: 'zcore-secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Passport Discord
passport.use(new DiscordStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: `${process.env.DASHBOARD_URL}/auth/discord/callback`,
  scope: ['identify', 'guilds']
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Dashboard routes would be in dashboard handler
console.log('Z-Core Bot & Dashboard Ready!');