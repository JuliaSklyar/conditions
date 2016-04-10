class Api::ConditionsController < ApplicationController

  def index
    respond_to do |format|
      format.json
    end
  end
end