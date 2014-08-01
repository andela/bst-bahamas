class ChargesController < ApplicationController
	def new
	end

	def create
	  charge = Stripe::Charge.create(
	    :amount => params[:amount] * 100,
	    :currency => "usd",
	    :card => params[:token],
	    :description => 'BSTBahamas Classified Ad Promote'
	  )
	  render json: {:message => "success"}, status: :ok
	rescue Stripe::CardError => e
	  render json: {:message => e.message}, status: 500
	end
end
