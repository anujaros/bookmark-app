# Bookmarx - A simple Bookmark app built with Next.Js and Supabase

#### Google oauth
#### Realtime sync
#### Preview of urls with images & descriptions
  
## Issues Encountered

### After Deploying the App, signing In did not redirect to user dashboard after google oauth
-> the issue was becuase of mismatch in env name in code for the site url and redirection code in callback route
-> After resolving the above and redeploying, issue was solved.

### Forms submission were sending GET requests instead of adding bookmarks to the database
 -> using preventDefault() in the custom form handler helped with this preventing the default html form submission and triggering the server action
