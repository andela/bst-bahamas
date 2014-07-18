# bst-bahamas

This project is a website for classified ads in the bahamas

### System Dependencies
* postgres
* ruby 2.0.0
* rails 4

### Database creation
* Create a local database in postgres 'bst-bahamas_development'
* Update your database user's credentials in 'database.yml'

### Install Dependencies
* `bundle install` - installs all rails dependencies
* `rake bower:install` - installs all front-end dependencies
* `rails g rails_admin:install` - installs admin interface

Add rails dependencies by updating the `Gemfile`
Add front-end dependencies by updating the `Bowerfile`

### Image Processor
For image upload to work, you'll need to install and configure ImageMagick
* `brew install ImageMagick`
* `brew link ImageMagick`

Then, in your environment config file, let Paperclip know to where ImageMagick is installed.
In development mode, you might add this line to `config/environments/development.rb`:
```
Paperclip.options[:command_path] = "/usr/local/bin/"
```

### Database migration
```
rake db:migrate
```

### Run the Application
```
rails s
```

Now browse to the app at `http://0.0.0.0:3000`.



## Directory Layout

    app/                    --> all of the files to be used in production
      assets/               --> assets files
        imgages/            --> image files
        javasscripts/       --> javascript files
          angular/          --> angular files
            controllers.js  --> application controllers
            services.js     --> custom angular services
           main.js          --> application
        stylesheets         --> css files (rails uses SASS)
      controllers/          --> backend controllers
      models/               --> backend models
    public/                 --> public files
      templates/            --> angular view partials (partial html templates)