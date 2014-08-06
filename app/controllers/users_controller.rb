class UsersController < ApplicationController
  before_action :authenticate_user!, except: [:reset_password, :update_password]
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  # GET /users
  # GET /users.json
  def index
    @users = User.all
    render json: @users, status: :ok
  end

  # GET /users/1
  # GET /users/1.json
  def show
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: 201
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    if @user.update(user_params)
      render json: @user, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    render json: {}, status: :ok
  end

  def reset_password
    user = User.where(:email => params[:email]).first
    user.send_reset_password_instructions
    render json: {:message => "success"}, status: :ok
  end

  def update_password
    encrypted_token = Devise.token_generator.digest(self, :reset_password_token, params[:reset_password_token])
    user = User.where(:reset_password_token => encrypted_token).first
    if user
      user.password = params[:password];
      user.password_confirmation = params[:password_confirmation]
      if user.valid?
        user.reset_password_token = nil;
        user.reset_password_sent_at = nil;
        user.save
        render json: {:message => "success"}, status: :ok
      else
        render json: {:errors => user.errors}, status: 500
      end
    else
      render json: {:error => "User not found"}, status: 404
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:username)
    end
end
