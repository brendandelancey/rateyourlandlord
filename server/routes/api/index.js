//probably removing from user.js and app.js -> this file is for access to my routes
import search from './search';
import user from './users';
import rating from './rating';
import initialpost from './initialpost';

 
export default {
  user,
  rating,
  initialpost,
  search
};