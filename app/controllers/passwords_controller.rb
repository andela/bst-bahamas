class PasswordsController < Devise::PasswordsController
  skip_before_filter :require_no_authentication
  def create
  	super
  end

  def new
    super
  end

  def update
    super
  end

  def edit
  	super
  end
end